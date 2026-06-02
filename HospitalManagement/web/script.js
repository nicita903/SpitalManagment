const users = {
    admin: "admin123",
    medic: "medic123",
    receptie: "receptie123"
};

const emptyData = {
    pacienti: [],
    medici: [],
    programari: [],
    internari: [],
    facturi: [],
    istoric: [],
    retete: [],
    statistici: {
        totalPacienti: 0,
        pacientiInternati: 0,
        totalMedici: 0,
        programariActive: 0,
        totalFacturi: 0,
        venitTotal: 0,
        diagnosticFrecvent: "N/A"
    },
    raport: {
        totalPacienti: 0,
        pacientiInternati: 0,
        totalMedici: 0,
        programariActive: 0,
        totalFacturi: 0,
        venitTotal: 0,
        diagnosticFrecvent: "N/A",
        pacientiCriticiUrgenti: 0
    }
};

const dataFiles = {
    pacienti: "../data/pacienti.json",
    medici: "../data/medici.json",
    programari: "../data/programari.json",
    internari: "../data/internari.json",
    facturi: "../data/facturi.json",
    istoric: "../data/istoric_medical.json",
    retete: "../data/retete.json",
    statistici: "../data/statistici.json",
    raport: "../data/raport_spital.json"
};
const storageKey = "hospitalManagementData";
let appData = null;
let patientModalMode = "edit";
let deletePatientId = null;

const pageFile = window.location.pathname.split("/").pop() || "login.html";
const isLoginPage = pageFile === "login.html";
const protectedPages = [
    "dashboard.html", "pacienti.html", "medici.html", "programari.html",
    "internari.html", "facturi.html", "istoric.html", "retete.html",
    "raport.html", "about.html"
];

if (protectedPages.includes(pageFile) && !localStorage.getItem("hospitalUser")) {
    window.location.href = "login.html";
}

function money(value) {
    return `${Number(value || 0).toFixed(2)} lei`;
}

function showToast(message, type = "info") {
    const oldToast = document.querySelector(".toast");
    if (oldToast) {
        oldToast.remove();
    }
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3200);
}

function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) {
        return;
    }
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    const firstInput = modal.querySelector("input, select, button");
    firstInput?.focus();
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) {
        return;
    }
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
}

function closeAllModals() {
    document.querySelectorAll(".modal-backdrop.is-open").forEach((modal) => closeModal(modal.id));
}

function setupModalCloseHandlers() {
    document.querySelectorAll("[data-close-modal]").forEach((button) => {
        if (button.dataset.closeReady === "true") {
            return;
        }
        button.dataset.closeReady = "true";
        button.addEventListener("click", () => closeModal(button.dataset.closeModal));
    });

    document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
        if (backdrop.dataset.backdropReady === "true") {
            return;
        }
        backdrop.dataset.backdropReady = "true";
        backdrop.addEventListener("click", (event) => {
            if (event.target === backdrop) {
                closeModal(backdrop.id);
            }
        });
    });

    if (document.body.dataset.escapeReady !== "true") {
        document.body.dataset.escapeReady = "true";
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeAllModals();
            }
        });
    }
}

function logout() {
    localStorage.removeItem("hospitalUser");
    window.location.href = "login.html";
}

function enhanceLayout() {
    if (isLoginPage) {
        return;
    }

    const labels = {
        "dashboard.html": "Dashboard",
        "pacienti.html": "Pacienti",
        "medici.html": "Medici",
        "programari.html": "Programari",
        "internari.html": "Internari",
        "facturi.html": "Facturi",
        "istoric.html": "Istoric medical",
        "retete.html": "Retete",
        "raport.html": "Rapoarte",
        "about.html": "Despre aplicatie"
    };

    document.querySelectorAll(".sidebar a").forEach((link) => {
        const href = link.getAttribute("href");
        if (labels[href]) {
            link.textContent = labels[href];
        }
        if (href === pageFile) {
            link.classList.add("active");
        }
    });

    const sidebar = document.querySelector(".sidebar");
    if (sidebar && !document.querySelector(".logout-link")) {
        const logoutLink = document.createElement("a");
        logoutLink.href = "#";
        logoutLink.className = "logout-link";
        logoutLink.textContent = "Logout";
        logoutLink.addEventListener("click", (event) => {
            event.preventDefault();
            logout();
        });
        sidebar.appendChild(logoutLink);
    }

    const chip = document.getElementById("userChip");
    if (chip) {
        chip.textContent = `Utilizator: ${localStorage.getItem("hospitalUser") || "necunoscut"}`;
    }

}

function clone(value) {
    return JSON.parse(JSON.stringify(value));
}

function recalcDerivedData(data) {
    const venitTotal = data.facturi.reduce((sum, f) => sum + Number(f.total || 0), 0);
    const diagnosticCounts = {};
    data.pacienti.forEach((p) => {
        diagnosticCounts[p.diagnostic] = (diagnosticCounts[p.diagnostic] || 0) + 1;
    });
    const diagnosticFrecvent = Object.entries(diagnosticCounts)
        .sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

    const statistici = {
        totalPacienti: data.pacienti.length,
        pacientiInternati: data.pacienti.filter((p) => p.internat).length,
        totalMedici: data.medici.length,
        programariActive: data.programari.filter((p) => p.status !== "anulata" && p.status !== "finalizata").length,
        totalFacturi: data.facturi.length,
        venitTotal,
        diagnosticFrecvent
    };

    data.statistici = statistici;
    data.raport = {
        ...statistici,
        pacientiCriticiUrgenti: data.pacienti.filter((p) => p.prioritate === "urgenta" || p.prioritate === "critica").length
    };
}

function saveData() {
    recalcDerivedData(appData);
    localStorage.setItem(storageKey, JSON.stringify(appData));
}

function nextId(items, field) {
    return items.reduce((max, item) => Math.max(max, Number(item[field] || 0)), 0) + 1;
}

async function loadJson(path, fallbackValue) {
    try {
        const response = await fetch(path, { cache: "no-store" });
        if (!response.ok) {
            throw new Error("Fisier indisponibil");
        }
        return await response.json();
    } catch (error) {
        return fallbackValue;
    }
}

async function loadAll() {
    if (appData) {
        return appData;
    }

    const stored = localStorage.getItem(storageKey);
    if (stored) {
        appData = JSON.parse(stored);
        recalcDerivedData(appData);
        return appData;
    }

    appData = {
        pacienti: await loadJson(dataFiles.pacienti, emptyData.pacienti),
        medici: await loadJson(dataFiles.medici, emptyData.medici),
        programari: await loadJson(dataFiles.programari, emptyData.programari),
        internari: await loadJson(dataFiles.internari, emptyData.internari),
        facturi: await loadJson(dataFiles.facturi, emptyData.facturi),
        istoric: await loadJson(dataFiles.istoric, emptyData.istoric),
        retete: await loadJson(dataFiles.retete, emptyData.retete),
        statistici: await loadJson(dataFiles.statistici, emptyData.statistici),
        raport: await loadJson(dataFiles.raport, emptyData.raport)
    };
    recalcDerivedData(appData);
    saveData();
    return appData;
}

function byId(items, id) {
    return items.find((item) => Number(item.id) === Number(id));
}

function resetPage() {
    renderDashboard();
    renderPacienti();
    renderMedici();
    renderProgramari();
    renderInternari();
    renderFacturi();
    renderIstoric();
    renderRetete();
    renderRaport();
}

function editPacient(id) {
    openEditPatientModal(id);
}

function stergePacient(id) {
    openDeleteConfirmModal(id);
}

function fillPatientForm(pacient = {}) {
    document.getElementById("patientId").value = pacient.id || "";
    document.getElementById("patientNume").value = pacient.nume || "";
    document.getElementById("patientPrenume").value = pacient.prenume || "";
    document.getElementById("patientVarsta").value = pacient.varsta || "";
    document.getElementById("patientTelefon").value = pacient.telefon || "";
    document.getElementById("patientDiagnostic").value = pacient.diagnostic || "";
    document.getElementById("patientGrupa").value = pacient.grupaSange || "";
    document.getElementById("patientAdresa").value = pacient.adresa || "";
    document.getElementById("patientAlergii").value = pacient.alergii || "";
    document.getElementById("patientPrioritate").value = pacient.prioritate || "medie";
    document.getElementById("patientInternat").value = String(Boolean(pacient.internat));
}

function openEditPatientModal(patientId) {
    const pacient = appData.pacienti.find((p) => Number(p.id) === Number(patientId));
    if (!pacient) {
        showToast("Pacientul nu a fost gasit.", "error");
        return;
    }

    patientModalMode = "edit";
    document.getElementById("patientModalTitle").textContent = "Editare pacient";
    document.getElementById("patientSubmitBtn").textContent = "Salveaza modificarile";
    fillPatientForm(pacient);
    openModal("patientModal");
}

function openAddPatientModal() {
    patientModalMode = "add";
    document.getElementById("patientModalTitle").textContent = "Adaugare pacient";
    document.getElementById("patientSubmitBtn").textContent = "Adauga pacient";
    fillPatientForm({ prioritate: "medie", internat: false });
    openModal("patientModal");
}

function openDeleteConfirmModal(patientId) {
    const pacient = appData.pacienti.find((p) => Number(p.id) === Number(patientId));
    if (!pacient) {
        showToast("Pacientul nu a fost gasit.", "error");
        return;
    }

    deletePatientId = patientId;
    document.getElementById("deleteModalText").textContent =
        `Sigur doresti sa stergi pacientul ${pacient.nume} ${pacient.prenume} din afisare?`;
    openModal("deleteModal");
}

function collectPatientFormData() {
    const varsta = Number(document.getElementById("patientVarsta").value);
    const prioritate = document.getElementById("patientPrioritate").value;
    const prioritati = ["scazuta", "medie", "urgenta", "critica"];
    const nume = document.getElementById("patientNume").value.trim();
    const prenume = document.getElementById("patientPrenume").value.trim();
    const diagnostic = document.getElementById("patientDiagnostic").value.trim();

    if (!nume || !prenume || !diagnostic) {
        showToast("Completeaza numele, prenumele si diagnosticul pacientului.", "error");
        return null;
    }

    if (varsta < 0 || varsta > 120 || !prioritati.includes(prioritate)) {
        showToast("Verifica varsta si prioritatea pacientului.", "error");
        return null;
    }

    const telefon = document.getElementById("patientTelefon").value.trim();
    if (!telefon) {
        showToast("Telefonul nu poate fi gol.", "error");
        return null;
    }

    return {
        id: Number(document.getElementById("patientId").value) || nextId(appData.pacienti, "id"),
        nume,
        prenume,
        varsta,
        telefon,
        diagnostic,
        grupaSange: document.getElementById("patientGrupa").value.trim(),
        adresa: document.getElementById("patientAdresa").value.trim(),
        alergii: document.getElementById("patientAlergii").value.trim(),
        prioritate,
        internat: document.getElementById("patientInternat").value === "true"
    };
}

async function savePatientFromModal(event) {
    event.preventDefault();
    if (!appData) {
        await loadAll();
    }

    const formData = collectPatientFormData();
    if (!formData) {
        return;
    }

    if (patientModalMode === "edit") {
        const index = appData.pacienti.findIndex((p) => Number(p.id) === Number(formData.id));
        if (index >= 0) {
            appData.pacienti[index] = { ...appData.pacienti[index], ...formData };
            showToast("Pacient actualizat temporar in browser. Salvarea permanenta se face in folderul data prin aplicatia C++.", "info");
        }
    } else {
        appData.pacienti.push(formData);
        showToast("Pacient adaugat temporar in browser. Pentru salvare permanenta, foloseste aplicatia C++.", "success");
    }

    saveData();
    closeModal("patientModal");
    resetPage();
}

function confirmDeletePatient() {
    if (deletePatientId === null) {
        return;
    }

    appData.pacienti = appData.pacienti.filter((p) => Number(p.id) !== Number(deletePatientId));
    appData.programari = appData.programari.filter((p) => Number(p.idPacient) !== Number(deletePatientId));
    appData.internari = appData.internari.filter((i) => Number(i.idPacient) !== Number(deletePatientId));
    appData.facturi = appData.facturi.filter((f) => Number(f.idPacient) !== Number(deletePatientId));
    appData.istoric = appData.istoric.filter((i) => Number(i.idPacient) !== Number(deletePatientId));
    appData.retete = appData.retete.filter((r) => Number(r.idPacient) !== Number(deletePatientId));
    deletePatientId = null;
    saveData();
    closeModal("deleteModal");
    resetPage();
    showToast("Pacient sters temporar din afisare.", "warning");
}

function setupPatientModals() {
    const addButton = document.getElementById("addPatientBtn");
    const patientForm = document.getElementById("patientForm");
    const confirmDeleteButton = document.getElementById("confirmDeleteBtn");
    const resetDataButton = document.getElementById("resetDataBtn");

    setupModalCloseHandlers();

    if (!addButton || addButton.dataset.modalReady === "true") {
        return;
    }

    addButton.dataset.modalReady = "true";
    addButton.addEventListener("click", openAddPatientModal);
    patientForm?.addEventListener("submit", savePatientFromModal);
    confirmDeleteButton?.addEventListener("click", confirmDeletePatient);
    resetDataButton?.addEventListener("click", reloadInitialData);
}

function permanentSaveToast(action) {
    showToast(`${action} Salvarea permanenta se face in folderul data prin aplicatia C++ din consola.`, "success");
}

function csvValue(value) {
    const text = String(value ?? "");
    return `"${text.replaceAll('"', '""')}"`;
}

function downloadText(filename, content, type = "text/plain") {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}

function buildCsv(headers, rows) {
    return [
        headers.map(csvValue).join(","),
        ...rows.map((row) => headers.map((header) => csvValue(row[header])).join(","))
    ].join("\n");
}

async function submitAppointment(event) {
    event.preventDefault();
    const data = await loadAll();
    const programare = {
        idProgramare: nextId(data.programari, "idProgramare"),
        idPacient: Number(document.getElementById("appointmentPatientId").value),
        idMedic: Number(document.getElementById("appointmentMedicId").value),
        data: document.getElementById("appointmentDate").value,
        ora: document.getElementById("appointmentTime").value,
        tipConsultatie: document.getElementById("appointmentType").value.trim(),
        status: "activa"
    };
    data.programari.push(programare);
    saveData();
    closeModal("appointmentModal");
    resetPage();
    permanentSaveToast("Programare adaugata temporar.");
}

async function submitHospitalization(event) {
    event.preventDefault();
    const data = await loadAll();
    const idPacient = Number(document.getElementById("hospitalizationPatientId").value);
    const pacient = byId(data.pacienti, idPacient);
    const zile = Number(document.getElementById("hospitalizationDays").value);
    const costPeZi = Number(document.getElementById("hospitalizationCost").value);
    const internare = {
        idInternare: nextId(data.internari, "idInternare"),
        idPacient,
        sectie: document.getElementById("hospitalizationSection").value.trim(),
        dataInternare: document.getElementById("hospitalizationDate").value,
        numarZile: zile,
        tipSalon: document.getElementById("hospitalizationRoom").value.trim(),
        costPeZi,
        status: "activa",
        costTotal: zile * costPeZi
    };
    data.internari.push(internare);
    if (pacient) {
        pacient.internat = true;
    }
    saveData();
    closeModal("hospitalizationModal");
    resetPage();
    permanentSaveToast("Internare adaugata temporar.");
}

function updateInvoicePreview() {
    const consultatie = Number(document.getElementById("invoiceConsultation")?.value || 0);
    const internare = Number(document.getElementById("invoiceHospitalization")?.value || 0);
    const tratament = Number(document.getElementById("invoiceTreatment")?.value || 0);
    const reducere = Number(document.getElementById("invoiceDiscount")?.value || 0);
    const total = Math.max(0, consultatie + internare + tratament - reducere);
    const preview = document.getElementById("invoiceTotalPreview");
    if (preview) {
        preview.textContent = money(total);
    }
    return total;
}

async function submitInvoice(event) {
    event.preventDefault();
    const data = await loadAll();
    const factura = {
        idFactura: nextId(data.facturi, "idFactura"),
        idPacient: Number(document.getElementById("invoicePatientId").value),
        dataEmitere: document.getElementById("invoiceDate").value,
        costConsultatie: Number(document.getElementById("invoiceConsultation").value),
        costInternare: Number(document.getElementById("invoiceHospitalization").value),
        costTratament: Number(document.getElementById("invoiceTreatment").value),
        reducere: Number(document.getElementById("invoiceDiscount").value),
        total: updateInvoicePreview()
    };
    data.facturi.push(factura);
    saveData();
    closeModal("invoiceModal");
    resetPage();
    permanentSaveToast("Factura emisa temporar.");
}

async function submitPrescription(event) {
    event.preventDefault();
    const data = await loadAll();
    const reteta = {
        idReteta: nextId(data.retete, "idReteta"),
        idPacient: Number(document.getElementById("prescriptionPatientId").value),
        idMedic: Number(document.getElementById("prescriptionDoctorId").value),
        medicamente: document.getElementById("prescriptionMedicine").value.trim(),
        dozaj: document.getElementById("prescriptionDosage").value.trim(),
        durataTratament: document.getElementById("prescriptionDuration").value.trim(),
        dataEmitere: document.getElementById("prescriptionDate").value
    };
    data.retete.push(reteta);
    saveData();
    closeModal("prescriptionModal");
    resetPage();
    permanentSaveToast("Reteta emisa temporar.");
}

async function generateVisualReport() {
    const data = await loadAll();
    recalcDerivedData(data);
    saveData();
    renderDashboard();
    renderRaport();
    const raportText = [
        "Raport spital",
        `Numar total pacienti: ${data.raport.totalPacienti}`,
        `Numar pacienti internati: ${data.raport.pacientiInternati}`,
        `Numar medici: ${data.raport.totalMedici}`,
        `Numar programari active: ${data.raport.programariActive}`,
        `Numar facturi: ${data.raport.totalFacturi}`,
        `Venit total: ${money(data.raport.venitTotal)}`,
        `Diagnostic frecvent: ${data.raport.diagnosticFrecvent}`,
        `Pacienti critici/urgenti: ${data.raport.pacientiCriticiUrgenti}`
    ].join("\n");
    downloadText("raport_spital_web.txt", raportText);
    showToast("Raport generat si descarcat. Raportul permanent se genereaza din C++.", "success");
}

async function exportCsvVisual() {
    const data = await loadAll();
    const pacientiCsv = buildCsv(
        ["id", "nume", "prenume", "varsta", "telefon", "diagnostic", "grupaSange", "internat", "prioritate"],
        data.pacienti
    );
    const programariCsv = buildCsv(
        ["idProgramare", "idPacient", "idMedic", "data", "ora", "tipConsultatie", "status"],
        data.programari
    );
    const facturiCsv = buildCsv(
        ["idFactura", "idPacient", "dataEmitere", "costConsultatie", "costInternare", "costTratament", "reducere", "total"],
        data.facturi
    );
    downloadText("pacienti_web.csv", pacientiCsv, "text/csv");
    downloadText("programari_web.csv", programariCsv, "text/csv");
    downloadText("facturi_web.csv", facturiCsv, "text/csv");
    showToast("CSV exportat. Exportul permanent se face din C++.", "success");
}

function setupActionModals() {
    setupModalCloseHandlers();

    const appointmentButton = document.getElementById("newAppointmentBtn");
    const appointmentForm = document.getElementById("appointmentForm");
    if (appointmentButton && appointmentButton.dataset.modalReady !== "true") {
        appointmentButton.dataset.modalReady = "true";
        appointmentButton.addEventListener("click", () => openModal("appointmentModal"));
        appointmentForm?.addEventListener("submit", submitAppointment);
    }

    const hospitalizationButton = document.getElementById("newHospitalizationBtn");
    const hospitalizationForm = document.getElementById("hospitalizationForm");
    if (hospitalizationButton && hospitalizationButton.dataset.modalReady !== "true") {
        hospitalizationButton.dataset.modalReady = "true";
        hospitalizationButton.addEventListener("click", () => openModal("hospitalizationModal"));
        hospitalizationForm?.addEventListener("submit", submitHospitalization);
    }

    const invoiceButton = document.getElementById("newInvoiceBtn");
    const invoiceForm = document.getElementById("invoiceForm");
    if (invoiceButton && invoiceButton.dataset.modalReady !== "true") {
        invoiceButton.dataset.modalReady = "true";
        invoiceButton.addEventListener("click", () => {
            updateInvoicePreview();
            openModal("invoiceModal");
        });
        invoiceForm?.addEventListener("submit", submitInvoice);
        document.querySelectorAll("[data-invoice-total]").forEach((input) => {
            input.addEventListener("input", updateInvoicePreview);
        });
    }

    const prescriptionButton = document.getElementById("newPrescriptionBtn");
    const prescriptionForm = document.getElementById("prescriptionForm");
    if (prescriptionButton && prescriptionButton.dataset.modalReady !== "true") {
        prescriptionButton.dataset.modalReady = "true";
        prescriptionButton.addEventListener("click", () => openModal("prescriptionModal"));
        prescriptionForm?.addEventListener("submit", submitPrescription);
    }
}

function setupReportButtons() {
    const generateButton = document.getElementById("generateReportBtn");
    const exportButton = document.getElementById("exportCsvBtn");

    if (generateButton && generateButton.dataset.ready !== "true") {
        generateButton.dataset.ready = "true";
        generateButton.addEventListener("click", generateVisualReport);
    }

    if (exportButton && exportButton.dataset.ready !== "true") {
        exportButton.dataset.ready = "true";
        exportButton.addEventListener("click", exportCsvVisual);
    }
}


function setupDashboardActions() {
    const resetButton = document.getElementById("resetDataBtn");
    if (resetButton && resetButton.dataset.ready !== "true") {
        resetButton.dataset.ready = "true";
        resetButton.addEventListener("click", reloadInitialData);
    }
}


function interneazaPacient(id) {
    const pacient = appData.pacienti.find((p) => Number(p.id) === Number(id));
    if (!pacient) {
        return;
    }
    if (pacient.internat) {
        alert("Pacientul este deja internat.");
        return;
    }

    const sectie = prompt("Sectie:", "Urgente");
    if (sectie === null) return;
    const numarZile = prompt("Numar zile:", "1");
    if (numarZile === null) return;
    const tipSalon = prompt("Tip salon:", "standard");
    if (tipSalon === null) return;
    const costPeZi = prompt("Cost pe zi:", "250");
    if (costPeZi === null) return;

    pacient.internat = true;
    appData.internari.push({
        idInternare: nextId(appData.internari, "idInternare"),
        idPacient: pacient.id,
        sectie: sectie.trim() || "Urgente",
        dataInternare: new Date().toISOString().slice(0, 10),
        numarZile: Number(numarZile) || 1,
        tipSalon: tipSalon.trim() || "standard",
        costPeZi: Number(costPeZi) || 250,
        status: "activa",
        costTotal: (Number(numarZile) || 1) * (Number(costPeZi) || 250)
    });
    saveData();
    resetPage();
}

function externeazaPacient(id) {
    const pacient = appData.pacienti.find((p) => Number(p.id) === Number(id));
    if (!pacient) {
        return;
    }
    if (!pacient.internat) {
        alert("Pacientul nu este internat.");
        return;
    }

    pacient.internat = false;
    const internare = appData.internari.find((i) => Number(i.idPacient) === Number(id) && i.status === "activa");
    if (internare) {
        internare.status = "finalizata";
    }
    saveData();
    resetPage();
}

async function reloadInitialData() {
    if (!confirm("Reincarci datele din folderul data si stergi modificarile temporare din browser?")) {
        return;
    }
    localStorage.removeItem(storageKey);
    appData = null;
    await loadAll();
    resetPage();
    showToast("Datele au fost reincarcate din folderul data.", "success");
}

function renderLogin() {
    const form = document.getElementById("loginForm");
    if (!form) {
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        if (users[username] === password) {
            localStorage.setItem("hospitalUser", username);
            window.location.href = "dashboard.html";
        } else {
            document.getElementById("loginError").textContent = "Username sau parola gresita.";
            showToast("Datele introduse nu sunt corecte.", "error");
        }
    });
}

async function renderDashboard() {
    if (!document.getElementById("totalPacienti")) {
        return;
    }

    const data = await loadAll();
    recalcDerivedData(data);

    const totalPacienti = data.statistici.totalPacienti;
    const pacientiInternati = data.statistici.pacientiInternati;
    const externi = Math.max(0, totalPacienti - pacientiInternati);
    const urgenti = data.pacienti.filter((p) => p.prioritate === "urgenta").length;
    const critici = data.pacienti.filter((p) => p.prioritate === "critica").length;
    const internariActive = data.internari.filter((i) => i.status === "activa").length;

    document.getElementById("totalPacienti").textContent = totalPacienti;
    document.getElementById("pacientiInternati").textContent = internariActive;
    document.getElementById("pacientiUrgenti").textContent = urgenti;
    document.getElementById("pacientiCritici").textContent = critici;
    document.getElementById("totalMedici").textContent = data.statistici.totalMedici;
    document.getElementById("totalProgramari").textContent = data.statistici.programariActive;
    document.getElementById("reteteEmise").textContent = data.retete.length;
    document.getElementById("facturiEmise").textContent = data.statistici.totalFacturi;
    document.getElementById("totalFacturi").textContent = money(data.statistici.venitTotal);
    document.getElementById("diagnosticFrecvent").textContent = data.statistici.diagnosticFrecvent;

    const patientRatio = document.getElementById("patientRatioText");
    if (patientRatio) {
        patientRatio.textContent = `${pacientiInternati} internati / ${externi} externi`;
    }

    const invoiceSummary = document.getElementById("invoiceSummaryText");
    if (invoiceSummary) {
        invoiceSummary.textContent = `${data.statistici.totalFacturi} facturi emise`;
    }

    const priorityOrder = { critica: 0, urgenta: 1, medie: 2, scazuta: 3 };
    const priorityPatients = document.getElementById("priorityPatients");
    if (priorityPatients) {
        const importantPatients = [...data.pacienti]
            .sort((a, b) => {
                const pa = priorityOrder[a.prioritate || "medie"] ?? 2;
                const pb = priorityOrder[b.prioritate || "medie"] ?? 2;
                if (pa !== pb) return pa - pb;
                return Number(b.internat) - Number(a.internat);
            })
            .filter((p) => ["critica", "urgenta"].includes(p.prioritate) || p.internat)
            .slice(0, 5);

        priorityPatients.innerHTML = importantPatients.length
            ? importantPatients.map((p) => `
                <div class="dashboard-list-item">
                    <div>
                        <strong>${p.nume} ${p.prenume}</strong>
                        <p>${p.diagnostic || "Diagnostic neindicat"} · ${p.varsta || "-"} ani · ${p.internat ? "internat" : "neinternat"}</p>
                    </div>
                    <span class="priority-badge priority-${p.prioritate || "medie"}">${p.prioritate || "medie"}</span>
                </div>
            `).join("")
            : `<div class="empty-state">Nu exista pacienti urgenti, critici sau internati.</div>`;
    }

    const nextAppointments = document.getElementById("nextAppointments");
    if (nextAppointments) {
        const appointments = [...data.programari]
            .filter((p) => p.status !== "anulata" && p.status !== "finalizata")
            .sort((a, b) => `${a.data || ""} ${a.ora || ""}`.localeCompare(`${b.data || ""} ${b.ora || ""}`))
            .slice(0, 5);

        nextAppointments.innerHTML = appointments.length
            ? appointments.map((programare) => {
                const pacient = byId(data.pacienti, programare.idPacient);
                const medic = byId(data.medici, programare.idMedic);
                return `
                    <div class="dashboard-list-item">
                        <div>
                            <strong>${programare.data || "Data lipsa"} · ${programare.ora || "--:--"}</strong>
                            <p>${pacient ? `${pacient.nume} ${pacient.prenume}` : `Pacient #${programare.idPacient}`} cu ${medic ? `Dr. ${medic.nume} ${medic.prenume}` : `medic #${programare.idMedic}`}</p>
                        </div>
                        <span class="status-badge status-active">${programare.tipConsultatie || "Consultatie"}</span>
                    </div>
                `;
            }).join("")
            : `<div class="empty-state">Nu exista programari active.</div>`;
    }

    const recent = document.getElementById("recentActivity");
    if (recent) {
        const lastInvoice = [...data.facturi]
            .sort((a, b) => String(b.dataEmitere || "").localeCompare(String(a.dataEmitere || "")))[0];
        const lastPrescription = [...data.retete]
            .sort((a, b) => String(b.dataEmitere || "").localeCompare(String(a.dataEmitere || "")))[0];

        recent.innerHTML = `
            <li>Ultima factura: ${lastInvoice ? `${lastInvoice.dataEmitere} · ${money(lastInvoice.total)}` : "N/A"}</li>
            <li>Ultima reteta: ${lastPrescription ? `${lastPrescription.dataEmitere} · ${lastPrescription.medicamente}` : "N/A"}</li>
            <li>Internari active: ${internariActive}</li>
        `;
    }
}

async function renderPacienti() {
    const table = document.getElementById("pacientiTable");
    if (!table) {
        return;
    }

    const data = await loadAll();
    const search = document.getElementById("searchName");
    const filter = document.getElementById("filterDiagnostic");
    const status = document.getElementById("filterStatus");
    const priority = document.getElementById("filterPriority");
    const sort = document.getElementById("sortName");
    const resetFilters = document.getElementById("resetFilters");
    let sortAsc = false;

    const selectedDiagnostic = filter.value;
    const diagnosticOptions = [...new Set(data.pacienti.map((p) => p.diagnostic).filter(Boolean))].sort();
    filter.innerHTML = `<option value="">Toate diagnosticele</option>`;
    diagnosticOptions.forEach((diagnostic) => {
        const option = document.createElement("option");
        option.value = diagnostic.toLowerCase();
        option.textContent = diagnostic;
        filter.appendChild(option);
    });
    filter.value = [...filter.options].some((option) => option.value === selectedDiagnostic) ? selectedDiagnostic : "";

    function draw() {
        const name = search.value.toLowerCase();
        const diagnostic = filter.value.toLowerCase();
        const statusValue = status.value;
        const priorityValue = priority.value;
        table.innerHTML = "";
        let pacienti = data.pacienti
            .filter((p) => `${p.nume} ${p.prenume}`.toLowerCase().includes(name))
            .filter((p) => !diagnostic || String(p.diagnostic || "").toLowerCase() === diagnostic)
            .filter((p) => statusValue === "toti" ||
                (statusValue === "internati" && p.internat) ||
                (statusValue === "neinternati" && !p.internat))
            .filter((p) => priorityValue === "toate" || (p.prioritate || "medie") === priorityValue);

        if (sortAsc) {
            pacienti = pacienti.sort((a, b) => `${a.nume} ${a.prenume}`.localeCompare(`${b.nume} ${b.prenume}`));
        }

        pacienti.forEach((p) => {
            table.innerHTML += `<tr>
                <td class="delete-cell">
                    <button class="delete-icon" data-action="delete" data-id="${p.id}" aria-label="Sterge pacient">X</button>
                </td>
                <td>${p.id}</td><td>${p.nume} ${p.prenume}</td><td>${p.varsta}</td><td>${p.telefon || "-"}</td>
                <td>${p.diagnostic}</td><td>${p.grupaSange}</td>
                <td><span class="priority-badge priority-${p.prioritate || "medie"}">${p.prioritate || "medie"}</span></td>
                <td><span class="status-badge ${p.internat ? "status-internat" : "status-neinternat"}">${p.internat ? "Internat" : "Neinternat"}</span></td>
                <td class="actions-cell">
                    <button class="action" data-action="edit" data-id="${p.id}">Editeaza</button>
                </td>
            </tr>`;
        });

        table.querySelectorAll("button[data-action]").forEach((button) => {
            button.addEventListener("click", () => {
                const id = Number(button.dataset.id);
                const action = button.dataset.action;
                if (action === "edit") editPacient(id);
                if (action === "delete") stergePacient(id);
            });
        });
    }

    search.oninput = draw;
    filter.oninput = draw;
    status.onchange = draw;
    priority.onchange = draw;
    if (sort._sortHandler) {
        sort.removeEventListener("click", sort._sortHandler);
    }
    sort._sortHandler = () => {
        sortAsc = !sortAsc;
        draw();
    };
    sort.addEventListener("click", sort._sortHandler);

    if (resetFilters) {
        if (resetFilters._resetHandler) {
            resetFilters.removeEventListener("click", resetFilters._resetHandler);
        }
        resetFilters._resetHandler = () => {
            search.value = "";
            filter.value = "";
            status.value = "toti";
            priority.value = "toate";
            sortAsc = false;
            draw();
        };
        resetFilters.addEventListener("click", resetFilters._resetHandler);
    }
    draw();
}

async function renderMedici() {
    const table = document.getElementById("mediciTable");
    if (!table) {
        return;
    }
    const data = await loadAll();
    const search = document.getElementById("mediciSearch");
    const draw = () => {
        const query = (search?.value || "").toLowerCase();
        table.innerHTML = data.medici
            .filter((m) => `${m.nume} ${m.prenume} ${m.specializare} ${m.sectie}`.toLowerCase().includes(query))
            .map((m) => `<tr>
                <td>${m.id}</td><td>${m.nume}</td><td>${m.prenume}</td><td>${m.sectie}</td>
                <td>${m.specializare}</td><td>${m.codParafa}</td><td>${m.numarConsultatii}</td>
            </tr>`).join("");
    };
    search?.addEventListener("input", draw);
    draw();
}

async function renderProgramari() {
    const table = document.getElementById("programariTable");
    if (!table) {
        return;
    }
    const data = await loadAll();
    const search = document.getElementById("programariSearch");
    const draw = () => {
        const query = (search?.value || "").toLowerCase();
        table.innerHTML = data.programari.map((p) => {
            const pacient = byId(data.pacienti, p.idPacient);
            const medic = byId(data.medici, p.idMedic);
            const rowText = `${pacient?.nume || ""} ${pacient?.prenume || ""} ${medic?.nume || ""} ${p.tipConsultatie} ${p.status}`.toLowerCase();
            if (!rowText.includes(query)) return "";
            const statusClass = p.status === "finalizata" ? "status-finalizat" :
                p.status === "anulata" ? "status-anulat" : "status-active";
            return `<tr>
                <td>${p.idProgramare}</td><td>${pacient ? `${pacient.nume} ${pacient.prenume}` : p.idPacient}</td>
                <td>${medic ? `${medic.nume} ${medic.prenume}` : p.idMedic}</td>
                <td>${p.data}</td><td>${p.ora}</td><td>${p.tipConsultatie}</td>
                <td><span class="status-badge ${statusClass}">${p.status}</span></td>
            </tr>`;
        }).join("");
    };
    search?.addEventListener("input", draw);
    draw();
}

async function renderInternari() {
    const table = document.getElementById("internariTable");
    if (!table) {
        return;
    }
    const data = await loadAll();
    const search = document.getElementById("internariSearch");
    const draw = () => {
        const query = (search?.value || "").toLowerCase();
        table.innerHTML = data.internari.map((i) => {
            const pacient = byId(data.pacienti, i.idPacient);
            const rowText = `${pacient?.nume || ""} ${pacient?.prenume || ""} ${i.sectie} ${i.status}`.toLowerCase();
            if (!rowText.includes(query)) return "";
            return `<tr>
                <td>${i.idInternare}</td><td>${pacient ? `${pacient.nume} ${pacient.prenume}` : i.idPacient}</td>
                <td>${i.sectie}</td><td>${i.dataInternare}</td><td>${i.numarZile}</td>
                <td>${i.tipSalon}</td><td><span class="status-badge ${i.status === "activa" ? "status-active" : "status-finalizat"}">${i.status}</span></td>
                <td><strong>${money(i.costTotal)}</strong></td>
                <td class="actions-cell">
                    ${i.status === "activa" ? `<button class="action danger" data-action="extern" data-id="${i.idPacient}">Externeaza</button>` : "-"}
                </td>
            </tr>`;
        }).join("");

        table.querySelectorAll("button[data-action]").forEach((button) => {
            button.addEventListener("click", () => {
                const id = Number(button.dataset.id);
                if (button.dataset.action === "extern") externeazaPacient(id);
            });
        });
    };
    search?.addEventListener("input", draw);
    draw();
}

async function renderFacturi() {
    const table = document.getElementById("facturiTable");
    if (!table) {
        return;
    }
    const data = await loadAll();
    const search = document.getElementById("facturiSearch");
    const draw = () => {
        const query = (search?.value || "").toLowerCase();
        table.innerHTML = data.facturi.map((f) => {
            const pacient = byId(data.pacienti, f.idPacient);
            const rowText = `${pacient?.nume || ""} ${pacient?.prenume || ""} ${f.dataEmitere}`.toLowerCase();
            if (!rowText.includes(query)) return "";
            return `<tr>
                <td>${f.idFactura}</td><td>${pacient ? `${pacient.nume} ${pacient.prenume}` : f.idPacient}</td>
                <td>${f.dataEmitere}</td><td>${money(f.costConsultatie)}</td><td>${money(f.costInternare)}</td>
                <td>${money(f.costTratament)}</td><td>${money(f.reducere)}</td><td><strong>${money(f.total)}</strong></td>
            </tr>`;
        }).join("");
    };
    search?.addEventListener("input", draw);
    draw();
}

async function renderIstoric() {
    const table = document.getElementById("istoricTable");
    if (!table) {
        return;
    }
    const data = await loadAll();
    table.innerHTML = data.istoric.map((i) => {
        const pacient = byId(data.pacienti, i.idPacient);
        return `<tr>
            <td>${i.idIstoric}</td><td>${pacient ? `${pacient.nume} ${pacient.prenume}` : i.idPacient}</td>
            <td>${i.diagnosticAnterior}</td><td>${i.tratament}</td><td>${i.dataConsultatie}</td><td>${i.observatiiMedic}</td>
        </tr>`;
    }).join("");
}

async function renderRetete() {
    const table = document.getElementById("reteteTable");
    if (!table) {
        return;
    }
    const data = await loadAll();
    table.innerHTML = data.retete.map((r) => {
        const pacient = byId(data.pacienti, r.idPacient);
        const medic = byId(data.medici, r.idMedic);
        return `<tr>
            <td>${r.idReteta}</td><td>${pacient ? `${pacient.nume} ${pacient.prenume}` : r.idPacient}</td>
            <td>${medic ? `${medic.nume} ${medic.prenume}` : r.idMedic}</td>
            <td>${r.medicamente}</td><td>${r.dozaj}</td><td>${r.durataTratament}</td><td>${r.dataEmitere}</td>
        </tr>`;
    }).join("");
}

async function renderRaport() {
    const cards = document.getElementById("raportCards");
    if (!cards) {
        return;
    }
    const data = await loadAll();
    const raport = data.raport;
    cards.innerHTML = `
        <article><span>Total pacienti</span><strong>${raport.totalPacienti}</strong></article>
        <article><span>Pacienti internati</span><strong>${raport.pacientiInternati}</strong></article>
        <article><span>Total medici</span><strong>${raport.totalMedici}</strong></article>
        <article><span>Programari active</span><strong>${raport.programariActive}</strong></article>
        <article><span>Total facturi</span><strong>${raport.totalFacturi}</strong></article>
        <article><span>Venit total</span><strong>${money(raport.venitTotal)}</strong></article>
        <article><span>Diagnostic frecvent</span><strong>${raport.diagnosticFrecvent}</strong></article>
        <article><span>Critici/Urgenti</span><strong>${raport.pacientiCriticiUrgenti}</strong></article>
    `;
    const table = document.getElementById("raportTable");
    if (table) {
        table.innerHTML = Object.entries({
            "Total pacienti": raport.totalPacienti,
            "Pacienti internati": raport.pacientiInternati,
            "Total medici": raport.totalMedici,
            "Programari active": raport.programariActive,
            "Total facturi": raport.totalFacturi,
            "Venit total": money(raport.venitTotal),
            "Diagnostic frecvent": raport.diagnosticFrecvent,
            "Pacienti critici/urgenti": raport.pacientiCriticiUrgenti
        }).map(([label, value]) => `<tr><td>${label}</td><td><strong>${value}</strong></td></tr>`).join("");
    }
}

enhanceLayout();
setupPatientModals();
setupActionModals();
setupReportButtons();
setupDashboardActions();
renderLogin();
renderDashboard();
renderPacienti();
renderMedici();
renderProgramari();
renderInternari();
renderFacturi();
renderIstoric();
renderRetete();
renderRaport();
