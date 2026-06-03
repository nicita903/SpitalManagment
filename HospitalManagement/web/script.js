const users = {
    admin: "admin123",
    medic: "medic123",
    receptie: "receptie123",
    farmacie: "farmacie123"
};

const userProfiles = {
    admin: { username: "admin", role: "admin", label: "Administrator sistem" },
    medic: { username: "medic", role: "medic", doctorId: 1, label: "Medic" },
    receptie: { username: "receptie", role: "receptie", label: "Operator receptie" },
    farmacie: { username: "farmacie", role: "farmacie", label: "Operator farmacie" }
};

const permissions = {
    admin: {
        patients: ["view", "create", "edit", "delete", "admit", "discharge", "medical_edit"],
        doctors: ["view", "create", "edit", "delete", "create_login", "reset_password", "view_salary"],
        appointments: ["view", "create", "edit", "cancel", "finish", "delete"],
        admissions: ["view", "create", "edit", "discharge", "delete"],
        invoices: ["view", "create", "edit", "delete", "export", "print"],
        reports: ["view", "export", "reset"],
        prescriptions: ["view", "create", "edit", "delete"],
        history: ["view", "create", "edit", "delete"],
        pharmacy: ["view", "create", "edit", "delete", "sell", "stock"],
        entries: ["view", "create", "edit"]
    },
    medic: {
        patients: ["view", "view_related", "medical_edit", "prescribe"],
        doctors: ["view_own_profile"],
        appointments: ["view_own", "cancel_own", "finish_own"],
        admissions: ["view_related"],
        invoices: [],
        reports: ["view_own"],
        prescriptions: ["view_own", "create", "edit_own", "cancel_own"],
        history: ["view_related", "create", "edit_own"],
        pharmacy: ["view"],
        entries: ["view_related"]
    },
    receptie: {
        patients: ["view", "create", "edit", "admit", "discharge"],
        doctors: ["view"],
        appointments: ["view", "create", "edit", "cancel"],
        admissions: ["view", "create", "discharge"],
        invoices: ["view", "create", "edit", "print"],
        reports: ["view_operational"],
        prescriptions: [],
        history: [],
        pharmacy: ["view", "sell"],
        entries: ["view", "create", "edit"]
    },
    farmacie: {
        patients: ["view"],
        doctors: [],
        appointments: [],
        admissions: [],
        invoices: [],
        reports: [],
        prescriptions: [],
        history: [],
        pharmacy: ["view", "create", "edit", "delete", "sell", "stock"],
        entries: []
    }
};

const pageAccessByRole = {
    admin: ["dashboard.html", "pacienti.html", "medici.html", "programari.html", "internari.html", "retete.html", "facturi.html", "farmacie.html", "raport.html", "about.html"],
    medic: ["dashboard.html", "pacienti.html", "medici.html", "programari.html", "internari.html", "retete.html", "farmacie.html"],
    receptie: ["dashboard.html", "pacienti.html", "programari.html", "internari.html", "facturi.html", "medici.html", "farmacie.html"],
    farmacie: ["farmacie.html"]
};

const menuItemsByRole = {
    admin: [
        ["dashboard.html", "Dashboard"],
        ["pacienti.html", "Pacienti"],
        ["medici.html", "Medici"],
        ["programari.html", "Programari"],
        ["internari.html", "Internari"],
        ["retete.html", "Retete"],
        ["facturi.html", "Facturi"],
        ["farmacie.html", "Farmacie"],
        ["raport.html", "Rapoarte"],
        ["about.html", "Despre"]
    ],
    medic: [
        ["dashboard.html", "Dashboard"],
        ["pacienti.html", "Pacientii mei"],
        ["programari.html", "Programarile mele"],
        ["internari.html", "Internari pacienti"],
        ["retete.html", "Retete"],
        ["farmacie.html", "Farmacie"]
    ],
    receptie: [
        ["dashboard.html", "Dashboard"],
        ["pacienti.html", "Pacienti"],
        ["programari.html", "Programari"],
        ["internari.html", "Internari"],
        ["facturi.html", "Facturi"],
        ["medici.html", "Medici disponibili"],
        ["farmacie.html", "Farmacie"]
    ],
    farmacie: [
        ["farmacie.html", "Farmacie"]
    ]
};

const emptyData = {
    users: [
            {
                    "id": 1,
                    "username": "admin",
                    "password": "admin123",
                    "role": "admin",
                    "fullName": "Administrator sistem",
                    "active": true
            },
            {
                    "id": 2,
                    "username": "receptie",
                    "password": "receptie123",
                    "role": "receptie",
                    "fullName": "Operator receptie",
                    "active": true
            },
            {
                    "id": 3,
                    "username": "farmacie",
                    "password": "farmacie123",
                    "role": "farmacie",
                    "fullName": "Operator farmacie",
                    "active": true
            },
            {
                    "id": 4,
                    "username": "medic1",
                    "password": "medic123",
                    "role": "medic",
                    "doctorId": 1,
                    "fullName": "Dr. Radu Pavel",
                    "active": true
            },
            {
                    "id": 5,
                    "username": "medic2",
                    "password": "medic123",
                    "role": "medic",
                    "doctorId": 2,
                    "fullName": "Dr. Stan Irina",
                    "active": true
            },
            {
                    "id": 6,
                    "username": "medic3",
                    "password": "medic123",
                    "role": "medic",
                    "doctorId": 3,
                    "fullName": "Dr. Botezatu Sergiu",
                    "active": true
            },
            {
                    "id": 7,
                    "username": "medic4",
                    "password": "medic123",
                    "role": "medic",
                    "doctorId": 4,
                    "fullName": "Dr. Dumitrescu Alina",
                    "active": true
            },
            {
                    "id": 8,
                    "username": "medic5",
                    "password": "medic123",
                    "role": "medic",
                    "doctorId": 5,
                    "fullName": "Dr. Moldovan Cristian",
                    "active": true
            },
            {
                    "id": 9,
                    "username": "medic",
                    "password": "medic123",
                    "role": "medic",
                    "doctorId": 1,
                    "fullName": "Dr. Radu Pavel",
                    "active": true
            }
    ],
    pacienti: [],
    medici: [],
    programari: [],
    internari: [],
    facturi: [],
    istoric: [],
    retete: [],
    intrari: [],
    medicamente: [
        { idMedicament: 1, denumire: "Paracetamol", substantaActiva: "Paracetamol", pretUnitar: 12.5, stoc: 80, necesitaReteta: "nu" },
        { idMedicament: 2, denumire: "Amoxicilina", substantaActiva: "Amoxicilina", pretUnitar: 28.9, stoc: 45, necesitaReteta: "da" },
        { idMedicament: 3, denumire: "Ibuprofen", substantaActiva: "Ibuprofen", pretUnitar: 18.0, stoc: 60, necesitaReteta: "nu" },
        { idMedicament: 4, denumire: "Metformin", substantaActiva: "Metformin", pretUnitar: 31.4, stoc: 35, necesitaReteta: "da" },
        { idMedicament: 5, denumire: "Omeprazol", substantaActiva: "Omeprazol", pretUnitar: 24.0, stoc: 50, necesitaReteta: "nu" }
    ],
    achizitii: [],
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
    users: "../data/users.json",
    pacienti: "../data/pacienti.json",
    medici: "../data/medici.json",
    programari: "../data/programari.json",
    internari: "../data/internari.json",
    facturi: "../data/facturi.json",
    istoric: "../data/istoric_medical.json",
    retete: "../data/retete.json",
    intrari: "../data/intrari_spital.json",
    medicamente: "../data/medicamente.json",
    achizitii: "../data/achizitii_medicamente.json",
    statistici: "../data/statistici.json",
    raport: "../data/raport_spital.json"
};

const seedData = {
    users: [
        {
            "id": 1,
            "username": "admin",
            "password": "admin123",
            "role": "admin",
            "fullName": "Administrator sistem",
            "active": true
        },
        {
            "id": 2,
            "username": "receptie",
            "password": "receptie123",
            "role": "receptie",
            "fullName": "Operator receptie",
            "active": true
        },
        {
            "id": 3,
            "username": "farmacie",
            "password": "farmacie123",
            "role": "farmacie",
            "fullName": "Operator farmacie",
            "active": true
        },
        {
            "id": 4,
            "username": "medic1",
            "password": "medic123",
            "role": "medic",
            "doctorId": 1,
            "fullName": "Dr. Radu Pavel",
            "active": true
        },
        {
            "id": 5,
            "username": "medic2",
            "password": "medic123",
            "role": "medic",
            "doctorId": 2,
            "fullName": "Dr. Stan Irina",
            "active": true
        },
        {
            "id": 6,
            "username": "medic3",
            "password": "medic123",
            "role": "medic",
            "doctorId": 3,
            "fullName": "Dr. Botezatu Sergiu",
            "active": true
        },
        {
            "id": 7,
            "username": "medic4",
            "password": "medic123",
            "role": "medic",
            "doctorId": 4,
            "fullName": "Dr. Dumitrescu Alina",
            "active": true
        },
        {
            "id": 8,
            "username": "medic5",
            "password": "medic123",
            "role": "medic",
            "doctorId": 5,
            "fullName": "Dr. Moldovan Cristian",
            "active": true
        },
        {
            "id": 9,
            "username": "medic",
            "password": "medic123",
            "role": "medic",
            "doctorId": 1,
            "fullName": "Dr. Radu Pavel",
            "active": true
        }
    ],
    medici: [
        {
            "id": 1,
            "nume": "Radu",
            "prenume": "Pavel",
            "varsta": 45,
            "telefon": "0733333333",
            "salariu": 18500,
            "sectie": "Cardiologie",
            "specializare": "Cardiolog",
            "codParafa": "CARD001",
            "numarConsultatii": 18
        },
        {
            "id": 2,
            "nume": "Stan",
            "prenume": "Irina",
            "varsta": 39,
            "telefon": "0744444444",
            "salariu": 17200,
            "sectie": "Ortopedie",
            "specializare": "Ortoped",
            "codParafa": "ORT002",
            "numarConsultatii": 14
        },
        {
            "id": 3,
            "nume": "Botezatu",
            "prenume": "Sergiu",
            "varsta": 42,
            "telefon": "0755556666",
            "salariu": 19000,
            "sectie": "Urgente",
            "specializare": "Medic urgentist",
            "codParafa": "URG003",
            "numarConsultatii": 26
        },
        {
            "id": 4,
            "nume": "Dumitrescu",
            "prenume": "Alina",
            "varsta": 36,
            "telefon": "0766667777",
            "salariu": 16800,
            "sectie": "Medicina interna",
            "specializare": "Medic internist",
            "codParafa": "INT004",
            "numarConsultatii": 21
        },
        {
            "id": 5,
            "nume": "Moldovan",
            "prenume": "Cristian",
            "varsta": 48,
            "telefon": "0777778888",
            "salariu": 18000,
            "sectie": "Neurologie",
            "specializare": "Neurolog",
            "codParafa": "NEU005",
            "numarConsultatii": 16
        }
    ],
    pacienti: [
        {
            "id": 1,
            "nume": "Popescu",
            "prenume": "Ana",
            "varsta": 25,
            "telefon": "0711111111",
            "diagnostic": "Gripa sezoniera",
            "grupaSange": "A+",
            "adresa": "Chisinau, str. Stefan cel Mare 12",
            "internat": false,
            "alergii": "fara",
            "prioritate": "medie"
        },
        {
            "id": 2,
            "nume": "Ionescu",
            "prenume": "Mihai",
            "varsta": 39,
            "telefon": "0722222222",
            "diagnostic": "Fractura antebrat",
            "grupaSange": "B+",
            "adresa": "Balti, str. Decebal 8",
            "internat": true,
            "alergii": "penicilina",
            "prioritate": "urgenta"
        },
        {
            "id": 3,
            "nume": "Ceban",
            "prenume": "Elena",
            "varsta": 58,
            "telefon": "0731112233",
            "diagnostic": "Hipertensiune arteriala",
            "grupaSange": "O+",
            "adresa": "Chisinau, bd. Dacia 45",
            "internat": false,
            "alergii": "fara",
            "prioritate": "medie"
        },
        {
            "id": 4,
            "nume": "Rusu",
            "prenume": "Victor",
            "varsta": 64,
            "telefon": "0745556677",
            "diagnostic": "Diabet zaharat tip 2",
            "grupaSange": "AB+",
            "adresa": "Orhei, str. Vasile Lupu 21",
            "internat": true,
            "alergii": "sulfamide",
            "prioritate": "critica"
        },
        {
            "id": 5,
            "nume": "Munteanu",
            "prenume": "Irina",
            "varsta": 31,
            "telefon": "0753334444",
            "diagnostic": "Migrena cronica",
            "grupaSange": "A-",
            "adresa": "Ungheni, str. Nationala 17",
            "internat": false,
            "alergii": "fara",
            "prioritate": "scazuta"
        },
        {
            "id": 6,
            "nume": "Moraru",
            "prenume": "Andrei",
            "varsta": 47,
            "telefon": "0767778888",
            "diagnostic": "Pneumonie comunitara",
            "grupaSange": "O-",
            "adresa": "Cahul, str. Republicii 5",
            "internat": true,
            "alergii": "aspirina",
            "prioritate": "urgenta"
        },
        {
            "id": 7,
            "nume": "Lupu",
            "prenume": "Maria",
            "varsta": 72,
            "telefon": "0772223333",
            "diagnostic": "Insuficienta cardiaca",
            "grupaSange": "B-",
            "adresa": "Soroca, str. Independentei 30",
            "internat": true,
            "alergii": "fara",
            "prioritate": "critica"
        },
        {
            "id": 8,
            "nume": "Rotaru",
            "prenume": "Dumitru",
            "varsta": 18,
            "telefon": "0784445555",
            "diagnostic": "Apendicita acuta",
            "grupaSange": "A+",
            "adresa": "Edinet, str. Mihai Eminescu 9",
            "internat": true,
            "alergii": "fara",
            "prioritate": "urgenta"
        },
        {
            "id": 9,
            "nume": "Balan",
            "prenume": "Sofia",
            "varsta": 43,
            "telefon": "0791110000",
            "diagnostic": "Gastrita cronica",
            "grupaSange": "AB-",
            "adresa": "Hincesti, str. Alexandru cel Bun 14",
            "internat": false,
            "alergii": "lactoza",
            "prioritate": "medie"
        },
        {
            "id": 10,
            "nume": "Ciobanu",
            "prenume": "Nicolai",
            "varsta": 52,
            "telefon": "0719998888",
            "diagnostic": "Bronsita acuta",
            "grupaSange": "O+",
            "adresa": "Balti, str. Kiev 33",
            "internat": false,
            "alergii": "fara",
            "prioritate": "scazuta"
        }
    ],
    programari: [
        {
            "idProgramare": 1,
            "idPacient": 1,
            "idMedic": 1,
            "data": "2026-06-10",
            "ora": "09:30",
            "tipConsultatie": "Consultatie generala",
            "status": "planificata"
        },
        {
            "idProgramare": 2,
            "idPacient": 3,
            "idMedic": 1,
            "data": "2026-06-10",
            "ora": "10:30",
            "tipConsultatie": "Control tensiune",
            "status": "planificata"
        },
        {
            "idProgramare": 3,
            "idPacient": 5,
            "idMedic": 4,
            "data": "2026-06-11",
            "ora": "13:00",
            "tipConsultatie": "Consultatie neurologica",
            "status": "planificata"
        },
        {
            "idProgramare": 4,
            "idPacient": 9,
            "idMedic": 4,
            "data": "2026-06-12",
            "ora": "11:15",
            "tipConsultatie": "Consultatie gastroenterologie",
            "status": "planificata"
        },
        {
            "idProgramare": 5,
            "idPacient": 10,
            "idMedic": 3,
            "data": "2026-06-13",
            "ora": "08:45",
            "tipConsultatie": "Control respirator",
            "status": "planificata"
        }
    ],
    internari: [
        {
            "idInternare": 1,
            "idPacient": 2,
            "sectie": "Ortopedie",
            "dataInternare": "2026-06-02",
            "numarZile": 4,
            "tipSalon": "standard",
            "costPeZi": 250.0,
            "status": "activa",
            "costTotal": 1000.0
        },
        {
            "idInternare": 2,
            "idPacient": 4,
            "sectie": "Medicina interna",
            "dataInternare": "2026-06-01",
            "numarZile": 6,
            "tipSalon": "standard",
            "costPeZi": 300.0,
            "status": "activa",
            "costTotal": 1800.0
        },
        {
            "idInternare": 3,
            "idPacient": 6,
            "sectie": "Pneumologie",
            "dataInternare": "2026-06-02",
            "numarZile": 5,
            "tipSalon": "standard",
            "costPeZi": 280.0,
            "status": "activa",
            "costTotal": 1400.0
        },
        {
            "idInternare": 4,
            "idPacient": 7,
            "sectie": "Cardiologie",
            "dataInternare": "2026-05-31",
            "numarZile": 7,
            "tipSalon": "terapie",
            "costPeZi": 450.0,
            "status": "activa",
            "costTotal": 3150.0
        },
        {
            "idInternare": 5,
            "idPacient": 8,
            "sectie": "Chirurgie",
            "dataInternare": "2026-06-02",
            "numarZile": 3,
            "tipSalon": "standard",
            "costPeZi": 320.0,
            "status": "activa",
            "costTotal": 960.0
        }
    ]
};

const storageKey = "hospitalManagementData";
let appData = null;
let patientModalMode = "edit";
let deletePatientId = null;
let selectedPrescriptionMedicines = [];

const pageFile = window.location.pathname.split("/").pop() || "login.html";
const isLoginPage = pageFile === "login.html";
const protectedPages = [
    "dashboard.html", "pacienti.html", "medici.html", "programari.html",
    "internari.html", "facturi.html", "retete.html",
    "farmacie.html", "raport.html", "about.html"
];

if (protectedPages.includes(pageFile) && !localStorage.getItem("hospitalUser")) {
    window.location.href = "login.html";
}

function getCurrentUser() {
    const stored = localStorage.getItem("hospitalCurrentUser");
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (error) {
            localStorage.removeItem("hospitalCurrentUser");
        }
    }

    const username = localStorage.getItem("hospitalUser");
    if (appData?.users?.length) {
        const user = appData.users.find((item) => item.username === username && item.active !== false);
        if (user) {
            return normalizeUserProfile(user);
        }
    }
    return username && userProfiles[username] ? { ...userProfiles[username] } : null;
}

function getCurrentRole() {
    return getCurrentUser()?.role || localStorage.getItem("hospitalRole") || "";
}

function hasPermission(module, action) {
    const role = getCurrentRole();
    return Boolean(permissions[role]?.[module]?.includes(action));
}

function requirePermission(module, action) {
    if (hasPermission(module, action)) {
        return true;
    }
    showToast("Nu aveti permisiune pentru aceasta actiune.", "error");
    return false;
}

function getOwnPatientIds(data) {
    const currentUser = getCurrentUser();
    if (!currentUser?.doctorId) {
        return new Set();
    }
    return new Set(
        data.programari
            .filter((programare) => Number(programare.idMedic) === Number(currentUser.doctorId))
            .map((programare) => Number(programare.idPacient))
    );
}

function filterDataByRole(dataType, items, sourceData = appData) {
    const role = getCurrentRole();
    if (role === "admin" || !sourceData) {
        return items;
    }

    if (role === "medic") {
        const currentUser = getCurrentUser();
        const doctorId = Number(currentUser?.doctorId);
        const ownPatientIds = getOwnPatientIds(sourceData);

        if (dataType === "pacienti") {
            return items.filter((pacient) => ownPatientIds.has(Number(pacient.id)));
        }
        if (dataType === "programari") {
            return items.filter((programare) => Number(programare.idMedic) === doctorId);
        }
        if (dataType === "internari") {
            return items.filter((internare) => ownPatientIds.has(Number(internare.idPacient)));
        }
        if (dataType === "istoric") {
            return items.filter((intrare) => ownPatientIds.has(Number(intrare.idPacient)));
        }
        if (dataType === "retete") {
            return items.filter((reteta) => Number(reteta.idMedic) === doctorId);
        }
        if (dataType === "intrari") {
            return items.filter((intrare) => ownPatientIds.has(Number(intrare.idPacient)));
        }
        if (dataType === "medici") {
            return items.filter((medic) => Number(medic.id) === doctorId);
        }
        if (dataType === "facturi") {
            return [];
        }
    }

    if (role === "receptie") {
        if (dataType === "istoric" || dataType === "retete") {
            return [];
        }
    }

    if (role === "farmacie") {
        if (["pacienti", "medicamente", "achizitii"].includes(dataType)) {
            return items;
        }
        return [];
    }

    return items;
}

function getRoleScopedData(data) {
    const scoped = {
        ...data,
        pacienti: filterDataByRole("pacienti", data.pacienti, data),
        medici: filterDataByRole("medici", data.medici, data),
        programari: filterDataByRole("programari", data.programari, data),
        internari: filterDataByRole("internari", data.internari, data),
        facturi: filterDataByRole("facturi", data.facturi, data),
        istoric: filterDataByRole("istoric", data.istoric, data),
        retete: filterDataByRole("retete", data.retete, data),
        intrari: filterDataByRole("intrari", data.intrari || [], data),
        medicamente: filterDataByRole("medicamente", data.medicamente || [], data),
        achizitii: filterDataByRole("achizitii", data.achizitii || [], data)
    };
    recalcDerivedData(scoped);
    return scoped;
}

function currentPageAllowed() {
    if (isLoginPage) {
        return true;
    }
    const role = getCurrentRole();
    return Boolean(pageAccessByRole[role]?.includes(pageFile));
}

function renderAccessDenied() {
    const main = document.querySelector("main");
    if (!main) {
        return;
    }
    main.innerHTML = `
        <section class="panel access-denied">
            <h1>Nu aveti acces la acest modul.</h1>
            <p>Rolul curent nu permite vizualizarea acestei pagini.</p>
            <a class="ghost-button" href="${getCurrentRole() === "farmacie" ? "farmacie.html" : "dashboard.html"}">Inapoi</a>
        </section>
    `;
}

function updateUserChip(data = appData) {
    const chip = document.getElementById("userChip");
    if (!chip) {
        return;
    }

    const currentUser = getCurrentUser();
    if (!currentUser) {
        chip.textContent = "Utilizator necunoscut";
        return;
    }

    if (currentUser.role === "admin") {
        chip.textContent = "Administrator sistem";
        return;
    }
    if (currentUser.role === "receptie") {
        chip.textContent = "Operator receptie";
        return;
    }
    if (currentUser.role === "farmacie") {
        chip.textContent = "Operator farmacie";
        return;
    }

    const medic = data?.medici?.find((m) => Number(m.id) === Number(currentUser.doctorId));
    chip.textContent = medic
        ? `Medic: Dr. ${medic.nume} ${medic.prenume} | ${medic.specializare || medic.sectie || "specializare"}`
        : `Medic | ID ${currentUser.doctorId}`;
}

function getVisibleMenuItemsByRole() {
    return menuItemsByRole[getCurrentRole()] || [];
}

function renderSidebarByRole() {
    const sidebar = document.querySelector(".sidebar");
    if (!sidebar || isLoginPage) {
        return;
    }

    const title = sidebar.querySelector("h2")?.outerHTML || "<h2>Hospital</h2>";
    sidebar.innerHTML = title;
    getVisibleMenuItemsByRole().forEach(([href, label]) => {
        const link = document.createElement("a");
        link.href = href;
        link.textContent = label;
        if (href === pageFile) {
            link.classList.add("active");
        }
        sidebar.appendChild(link);
    });

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

function applyRoleVisibility() {
    const protectedElements = [
        ["addPatientBtn", "patients", "create"],
        ["resetDataBtn", "reports", "reset"],
        ["newAppointmentBtn", "appointments", "create"],
        ["newHospitalizationBtn", "admissions", "create"],
        ["newInvoiceBtn", "invoices", "create"],
        ["newPrescriptionBtn", "prescriptions", "create"],
        ["addDoctorBtn", "doctors", "create"],
        ["addMedicineBtn", "pharmacy", "create"],
        ["generateReportBtn", "reports", "export"],
        ["exportCsvBtn", "reports", "export"]
    ];

    protectedElements.forEach(([id, module, action]) => {
        const element = document.getElementById(id);
        if (element) {
            element.hidden = !hasPermission(module, action);
        }
    });

    document.querySelectorAll("[data-permission-module][data-permission-action]").forEach((element) => {
        element.hidden = !hasPermission(element.dataset.permissionModule, element.dataset.permissionAction);
    });
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
    localStorage.removeItem("hospitalRole");
    localStorage.removeItem("hospitalCurrentUser");
    window.location.href = "login.html";
}

function enhanceLayout() {
    if (isLoginPage) {
        return;
    }

    renderSidebarByRole();
    updateUserChip();
    if (!currentPageAllowed()) {
        renderAccessDenied();
    }
    applyRoleVisibility();
}

function clone(value) {
    return JSON.parse(JSON.stringify(value));
}

function normalizeUserProfile(user) {
    return {
        id: user.id,
        username: user.username,
        role: user.role,
        doctorId: user.doctorId,
        fullName: user.fullName || user.label || user.username,
        label: user.fullName || user.label || user.username,
        active: user.active !== false
    };
}

function ensureDefaultUsers(data) {
    data.users = ensureArray(data.users);
    data.medici = ensureArray(data.medici);
    emptyData.users.forEach((defaultUser) => {
        const existing = data.users.find((user) => user.username === defaultUser.username);
        if (!existing) {
            data.users.push({ ...defaultUser });
        } else {
            Object.assign(existing, { ...defaultUser, ...existing, active: existing.active !== false });
        }
    });

    data.medici.forEach((medic) => {
        const hasUser = data.users.some((user) => Number(user.doctorId) === Number(medic.id) && user.role === "medic");
        if (!hasUser && Number(medic.id) === 1) {
            const medicUser = data.users.find((user) => user.username === "medic");
            if (medicUser) {
                medicUser.doctorId = medic.id;
                medicUser.fullName = `Dr. ${medic.nume} ${medic.prenume}`;
                medicUser.active = true;
            }
        }
    });
}
function ensureSeedHospitalData(data) {
    data.users = ensureArray(data.users);
    data.medici = ensureArray(data.medici);
    data.pacienti = ensureArray(data.pacienti);
    data.programari = ensureArray(data.programari);
    data.internari = ensureArray(data.internari);

    const mergeByField = (target, source, field, updateExisting = false) => {
        source.forEach((item) => {
            const existing = target.find((entry) => String(entry[field]) === String(item[field]));
            if (!existing) {
                target.push({ ...item });
            } else if (updateExisting) {
                Object.assign(existing, { ...item, ...existing });
                if (item.active !== undefined && existing.active === undefined) {
                    existing.active = item.active;
                }
            }
        });
    };

    mergeByField(data.users, seedData.users, "username", true);
    mergeByField(data.medici, seedData.medici, "id", false);
    mergeByField(data.pacienti, seedData.pacienti, "id", false);
    mergeByField(data.programari, seedData.programari, "idProgramare", false);
    mergeByField(data.internari, seedData.internari, "idInternare", false);

    const oldMedic = data.users.find((user) => user.username === "medic");
    if (oldMedic) {
        oldMedic.role = "medic";
        oldMedic.password = oldMedic.password || "medic123";
        oldMedic.doctorId = oldMedic.doctorId || 1;
        oldMedic.fullName = oldMedic.fullName || "Dr. Radu Pavel";
        oldMedic.active = oldMedic.active !== false;
    }
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

function ensureArray(value) {
    return Array.isArray(value) ? value : [];
}

let backendAvailable = null;

async function checkBackend() {
    if (backendAvailable !== null) {
        return backendAvailable;
    }
    try {
        const response = await fetch("/api/health", { cache: "no-store" });
        backendAvailable = response.ok;
    } catch (error) {
        backendAvailable = false;
    }
    return backendAvailable;
}

async function loadFromBackend() {
    try {
        const response = await fetch("/api/data", { cache: "no-store" });
        if (!response.ok) {
            throw new Error("Server indisponibil");
        }
        backendAvailable = true;
        return await response.json();
    } catch (error) {
        backendAvailable = false;
        return null;
    }
}

async function saveDataToBackend(data) {
    try {
        const response = await fetch("/api/data", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error("Salvarea pe server a esuat");
        }
        backendAvailable = true;
        return true;
    } catch (error) {
        backendAvailable = false;
        console.warn("Datele s-au salvat doar in browser. Porneste serverul Node.js pentru salvare in JSON.", error);
        return false;
    }
}

function saveData() {
    recalcDerivedData(appData);
    localStorage.setItem(storageKey, JSON.stringify(appData));
    saveDataToBackend(appData);
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

    const backendData = await loadFromBackend();
    if (backendData) {
        appData = backendData;
        appData.users = ensureArray(appData.users);
        appData.pacienti = ensureArray(appData.pacienti);
        appData.medici = ensureArray(appData.medici);
        appData.programari = ensureArray(appData.programari);
        appData.internari = ensureArray(appData.internari);
        appData.facturi = ensureArray(appData.facturi);
        appData.istoric = ensureArray(appData.istoric);
        appData.retete = ensureArray(appData.retete);
        appData.intrari = ensureArray(appData.intrari);
        appData.medicamente = ensureArray(appData.medicamente).length ? appData.medicamente : clone(emptyData.medicamente);
        appData.achizitii = ensureArray(appData.achizitii);
        ensureDefaultUsers(appData);
        ensureSeedHospitalData(appData);
        recalcDerivedData(appData);
        localStorage.setItem(storageKey, JSON.stringify(appData));
        return appData;
    }

    const stored = localStorage.getItem(storageKey);
    if (stored) {
        appData = JSON.parse(stored);
        appData.users = ensureArray(appData.users);
        appData.intrari = ensureArray(appData.intrari);
        appData.medicamente = ensureArray(appData.medicamente).length ? appData.medicamente : clone(emptyData.medicamente);
        appData.achizitii = ensureArray(appData.achizitii);
        ensureDefaultUsers(appData);
        ensureSeedHospitalData(appData);
        recalcDerivedData(appData);
        saveData();
        return appData;
    }

    appData = {
        users: await loadJson(dataFiles.users, emptyData.users),
        pacienti: await loadJson(dataFiles.pacienti, emptyData.pacienti),
        medici: await loadJson(dataFiles.medici, emptyData.medici),
        programari: await loadJson(dataFiles.programari, emptyData.programari),
        internari: await loadJson(dataFiles.internari, emptyData.internari),
        facturi: await loadJson(dataFiles.facturi, emptyData.facturi),
        istoric: await loadJson(dataFiles.istoric, emptyData.istoric),
        retete: await loadJson(dataFiles.retete, emptyData.retete),
        intrari: await loadJson(dataFiles.intrari, emptyData.intrari),
        medicamente: await loadJson(dataFiles.medicamente, emptyData.medicamente),
        achizitii: await loadJson(dataFiles.achizitii, emptyData.achizitii),
        statistici: await loadJson(dataFiles.statistici, emptyData.statistici),
        raport: await loadJson(dataFiles.raport, emptyData.raport)
    };
    ensureDefaultUsers(appData);
    ensureSeedHospitalData(appData);
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
    renderFarmacie();
    renderRaport();
    applyRoleVisibility();
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
    ["entryDate", "entryTime", "entryReason", "entryCompanion", "entryNotes"].forEach((id) => {
        const field = document.getElementById(id);
        if (field) field.value = "";
    });
    const entryMode = document.getElementById("entryMode");
    const entryUrgency = document.getElementById("entryUrgency");
    if (entryMode) entryMode.value = "";
    if (entryUrgency) entryUrgency.value = "mediu";
}

function openEditPatientModal(patientId) {
    if (!requirePermission("patients", hasPermission("patients", "edit") ? "edit" : "medical_edit")) {
        return;
    }
    const pacient = appData.pacienti.find((p) => Number(p.id) === Number(patientId));
    if (!pacient) {
        showToast("Pacientul nu a fost gasit.", "error");
        return;
    }

    patientModalMode = "edit";
    document.getElementById("patientModalTitle").textContent = "Editare pacient";
    document.getElementById("patientSubmitBtn").textContent = "Salveaza modificarile";
    fillPatientForm(pacient);
    configurePatientFormByRole();
    openModal("patientModal");
}

function openAddPatientModal() {
    if (!requirePermission("patients", "create")) {
        return;
    }
    patientModalMode = "add";
    document.getElementById("patientModalTitle").textContent = "Adaugare pacient";
    document.getElementById("patientSubmitBtn").textContent = "Adauga pacient";
    fillPatientForm({ prioritate: "medie", internat: false });
    configurePatientFormByRole();
    openModal("patientModal");
}

function openDeleteConfirmModal(patientId) {
    if (!requirePermission("patients", "delete")) {
        return;
    }
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

function configurePatientFormByRole() {
    const role = getCurrentRole();
    const administrativeFields = [
        "patientNume", "patientPrenume", "patientVarsta", "patientTelefon",
        "patientGrupa", "patientAdresa", "patientAlergii"
    ];
    const medicalFields = ["patientDiagnostic", "patientPrioritate"];
    const entryFields = ["entryDate", "entryTime", "entryMode", "entryUrgency", "entryReason", "entryCompanion", "entryNotes"];
    const setDisabled = (id, disabled) => {
        const field = document.getElementById(id);
        if (field) {
            field.disabled = disabled;
            field.readOnly = disabled;
        }
    };

    [...administrativeFields, ...medicalFields].forEach((id) => setDisabled(id, false));

    if (role === "medic") {
        administrativeFields.forEach((id) => setDisabled(id, true));
        entryFields.forEach((id) => setDisabled(id, true));
        medicalFields.forEach((id) => setDisabled(id, false));
    }

    if (role === "receptie" && patientModalMode === "edit") {
        setDisabled("patientDiagnostic", true);
    }
}

function collectEntryFormData(idPacient) {
    const modIntrare = document.getElementById("entryMode")?.value || "";
    if (!modIntrare) {
        return null;
    }

    const dataIntrare = document.getElementById("entryDate")?.value || new Date().toISOString().slice(0, 10);
    const oraIntrare = document.getElementById("entryTime")?.value || "08:00";
    return {
        idIntrare: nextId(appData.intrari || [], "idIntrare"),
        idPacient,
        dataIntrare,
        oraIntrare,
        modIntrare,
        motivPrezentare: document.getElementById("entryReason")?.value.trim() || "Consultatie initiala",
        nivelUrgenta: document.getElementById("entryUrgency")?.value || "mediu",
        insotitor: document.getElementById("entryCompanion")?.value.trim() || "",
        observatiiInitiale: document.getElementById("entryNotes")?.value.trim() || "",
        status: "inregistrat"
    };
}

function applyEntryPriority(pacient, intrare) {
    if (!intrare) {
        return;
    }
    if (intrare.nivelUrgenta === "critic" || intrare.modIntrare === "ambulanta") {
        pacient.prioritate = "critica";
    } else if (intrare.nivelUrgenta === "urgent" || intrare.modIntrare === "urgenta") {
        pacient.prioritate = "urgenta";
    }
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
    if (!requirePermission("patients", patientModalMode === "add" ? "create" : (hasPermission("patients", "edit") ? "edit" : "medical_edit"))) {
        return;
    }
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
        const intrare = collectEntryFormData(formData.id);
        applyEntryPriority(formData, intrare);
        appData.pacienti.push(formData);
        if (intrare) {
            appData.intrari.push(intrare);
        }
        showToast("Pacient adaugat temporar in browser. Pentru salvare permanenta, foloseste aplicatia C++.", "success");
    }

    saveData();
    closeModal("patientModal");
    resetPage();
}

function confirmDeletePatient() {
    if (!requirePermission("patients", "delete")) {
        closeModal("deleteModal");
        return;
    }
    if (deletePatientId === null) {
        return;
    }

    appData.pacienti = appData.pacienti.filter((p) => Number(p.id) !== Number(deletePatientId));
    appData.programari = appData.programari.filter((p) => Number(p.idPacient) !== Number(deletePatientId));
    appData.internari = appData.internari.filter((i) => Number(i.idPacient) !== Number(deletePatientId));
    appData.facturi = appData.facturi.filter((f) => Number(f.idPacient) !== Number(deletePatientId));
    appData.istoric = appData.istoric.filter((i) => Number(i.idPacient) !== Number(deletePatientId));
    appData.retete = appData.retete.filter((r) => Number(r.idPacient) !== Number(deletePatientId));
    appData.intrari = appData.intrari.filter((i) => Number(i.idPacient) !== Number(deletePatientId));
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

function fillDoctorForm(medic = {}) {
    const user = appData?.users?.find((item) => Number(item.doctorId) === Number(medic.id) && item.role === "medic");
    document.getElementById("doctorId").value = medic.id || "";
    document.getElementById("doctorNume").value = medic.nume || "";
    document.getElementById("doctorPrenume").value = medic.prenume || "";
    document.getElementById("doctorVarsta").value = medic.varsta || "";
    document.getElementById("doctorTelefon").value = medic.telefon || "";
    document.getElementById("doctorSalariu").value = medic.salariu || 0;
    document.getElementById("doctorSectie").value = medic.sectie || "";
    document.getElementById("doctorSpecializare").value = medic.specializare || "";
    document.getElementById("doctorCodParafa").value = medic.codParafa || "";
    document.getElementById("doctorConsultatii").value = medic.numarConsultatii || 0;
    document.getElementById("doctorUsername").value = user?.username || "";
    document.getElementById("doctorPassword").value = "";
    document.getElementById("doctorPasswordConfirm").value = "";
    document.getElementById("doctorAccountActive").value = String(user?.active !== false);
}

function openDoctorModal(id = null) {
    if (!requirePermission("doctors", id ? "edit" : "create")) {
        return;
    }
    const medic = id ? appData.medici.find((item) => Number(item.id) === Number(id)) : {};
    if (id && !medic) {
        showToast("Medicul nu a fost gasit.", "error");
        return;
    }
    document.getElementById("doctorModalTitle").textContent = id ? "Editare medic" : "Adauga medic";
    document.getElementById("doctorSubmitBtn").textContent = id ? "Salveaza modificarile" : "Adauga medic";
    fillDoctorForm(medic);
    openModal("doctorModal");
}

function collectDoctorFormData() {
    const isEdit = Boolean(document.getElementById("doctorId").value);
    const doctorId = Number(document.getElementById("doctorId").value) || nextId(appData.medici, "id");
    const username = document.getElementById("doctorUsername").value.trim();
    const password = document.getElementById("doctorPassword").value;
    const confirmPassword = document.getElementById("doctorPasswordConfirm").value;
    const existingAccount = appData.users.find((user) => Number(user.doctorId) === Number(doctorId) && user.role === "medic");
    const medic = {
        id: doctorId,
        nume: document.getElementById("doctorNume").value.trim(),
        prenume: document.getElementById("doctorPrenume").value.trim(),
        varsta: Number(document.getElementById("doctorVarsta").value),
        telefon: document.getElementById("doctorTelefon").value.trim(),
        salariu: Number(document.getElementById("doctorSalariu").value),
        sectie: document.getElementById("doctorSectie").value.trim(),
        specializare: document.getElementById("doctorSpecializare").value.trim(),
        codParafa: document.getElementById("doctorCodParafa").value.trim(),
        numarConsultatii: Number(document.getElementById("doctorConsultatii").value)
    };
    if (!medic.nume || !medic.prenume || !medic.telefon || !medic.sectie || !medic.specializare || !medic.codParafa || !username) {
        showToast("Completeaza toate datele medicului.", "error");
        return null;
    }
    if (medic.varsta < 18 || medic.varsta > 90 || medic.salariu < 0) {
        showToast("Verifica varsta si salariul medicului.", "error");
        return null;
    }
    const usernameTaken = appData.users.some((user) => user.username === username && Number(user.doctorId) !== Number(doctorId));
    if (usernameTaken) {
        showToast("Username-ul este deja folosit.", "error");
        return null;
    }
    const codParafaTaken = appData.medici.some((item) => item.codParafa === medic.codParafa && Number(item.id) !== Number(doctorId));
    if (codParafaTaken) {
        showToast("Codul de parafa trebuie sa fie unic.", "error");
        return null;
    }
    if (!isEdit && !password) {
        showToast("Parola este obligatorie pentru contul nou.", "error");
        return null;
    }
    if (password !== confirmPassword) {
        showToast("Parolele nu coincid.", "error");
        return null;
    }
    return {
        medic,
        account: {
            id: existingAccount?.id || nextId(appData.users, "id"),
            username,
            password: password || existingAccount?.password || "medic123",
            role: "medic",
            doctorId,
            fullName: `Dr. ${medic.nume} ${medic.prenume}`,
            active: document.getElementById("doctorAccountActive").value === "true"
        }
    };
}

async function saveDoctorFromModal(event) {
    event.preventDefault();
    if (!appData) {
        await loadAll();
    }
    const isEdit = Boolean(document.getElementById("doctorId").value);
    if (!requirePermission("doctors", isEdit ? "edit" : "create")) {
        return;
    }
    const collected = collectDoctorFormData();
    if (!collected) {
        return;
    }
    const { medic, account } = collected;
    const index = appData.medici.findIndex((item) => Number(item.id) === Number(medic.id));
    if (index >= 0) {
        appData.medici[index] = { ...appData.medici[index], ...medic };
    } else {
        appData.medici.push(medic);
    }
    const userIndex = appData.users.findIndex((user) => Number(user.doctorId) === Number(medic.id) && user.role === "medic");
    if (userIndex >= 0) {
        appData.users[userIndex] = { ...appData.users[userIndex], ...account };
    } else {
        appData.users.push(account);
    }
    saveData();
    closeModal("doctorModal");
    resetPage();
    permanentSaveToast(isEdit ? "Medicul si contul lui au fost actualizate temporar." : "Medicul si contul de autentificare au fost create temporar.");
}

function deleteDoctor(id) {
    if (!requirePermission("doctors", "delete")) {
        return;
    }
    if (appData.programari.some((programare) => Number(programare.idMedic) === Number(id) && programare.status === "activa")) {
        showToast("Medicul are programari active si nu poate fi sters.", "error");
        return;
    }
    appData.medici = appData.medici.filter((medic) => Number(medic.id) !== Number(id));
    appData.users.forEach((user) => {
        if (Number(user.doctorId) === Number(id) && user.role === "medic") {
            user.active = false;
        }
    });
    saveData();
    resetPage();
    showToast("Medic sters temporar, contul asociat a fost dezactivat.", "warning");
}

function setupDoctorModals() {
    setupModalCloseHandlers();
    const addButton = document.getElementById("addDoctorBtn");
    const form = document.getElementById("doctorForm");
    if (addButton && addButton.dataset.modalReady !== "true") {
        addButton.dataset.modalReady = "true";
        addButton.addEventListener("click", () => openDoctorModal());
    }
    if (form && form.dataset.modalReady !== "true") {
        form.dataset.modalReady = "true";
        form.addEventListener("submit", saveDoctorFromModal);
    }
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
    if (!requirePermission("appointments", "create")) {
        return;
    }
    const data = getRoleScopedData(await loadAll());
    const idPacient = Number(document.getElementById("appointmentPatientId").value);
    const idMedic = Number(document.getElementById("appointmentMedicId").value);
    const appointmentDate = document.getElementById("appointmentDate").value;
    const appointmentTime = document.getElementById("appointmentTime").value;
    if (!byId(data.pacienti, idPacient) || !byId(data.medici, idMedic)) {
        showToast("Pacientul sau medicul nu exista.", "error");
        return;
    }
    if (data.programari.some((programare) =>
        Number(programare.idMedic) === idMedic &&
        programare.data === appointmentDate &&
        programare.ora === appointmentTime &&
        programare.status !== "anulata"
    )) {
        showToast("Medicul are deja programare la aceeasi data si ora.", "error");
        return;
    }
    const programare = {
        idProgramare: nextId(data.programari, "idProgramare"),
        idPacient,
        idMedic,
        data: appointmentDate,
        ora: appointmentTime,
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
    if (!requirePermission("admissions", "create")) {
        return;
    }
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
    const intrare = [...(data.intrari || [])].reverse().find((item) => Number(item.idPacient) === idPacient);
    if (intrare) {
        intrare.status = "internat";
    }
    saveData();
    closeModal("hospitalizationModal");
    resetPage();
    permanentSaveToast("Internare adaugata temporar.");
}

function getPrescriptionMedicineTotal(reteta, medicamente = appData?.medicamente || []) {
    if (!reteta) {
        return 0;
    }
    if (Number(reteta.costMedicamente || 0) > 0) {
        return Number(reteta.costMedicamente || 0);
    }
    if (Array.isArray(reteta.medicamenteSelectate) && reteta.medicamenteSelectate.length) {
        return reteta.medicamenteSelectate.reduce((sum, item) => {
            const medicament = byMedicineId(medicamente, item.idMedicament);
            const pret = Number(medicament?.pretUnitar ?? item.pretUnitar ?? 0);
            return sum + pret * Number(item.cantitate || 0);
        }, 0);
    }
    return 0;
}

function getPrescriptionMedicinesLabel(reteta) {
    if (!reteta) {
        return "";
    }
    if (Array.isArray(reteta.medicamenteSelectate) && reteta.medicamenteSelectate.length) {
        return reteta.medicamenteSelectate
            .map((item) => `${item.denumire} x${item.cantitate}`)
            .join(", ");
    }
    return reteta.medicamente || "Medicamente fara detalii de pret";
}

function fillInvoicePrescriptionSelect() {
    const patientInput = document.getElementById("invoicePatientId");
    const select = document.getElementById("invoicePrescriptionSelect");
    if (!select || !appData) {
        return;
    }
    const idPacient = Number(patientInput?.value || 0);
    const retetePacient = (appData.retete || []).filter((reteta) => !idPacient || Number(reteta.idPacient) === idPacient);
    select.innerHTML = '<option value="">Fara reteta / 0 lei</option>' + retetePacient.map((reteta) => {
        const total = getPrescriptionMedicineTotal(reteta, appData.medicamente || []);
        const label = getPrescriptionMedicinesLabel(reteta);
        return `<option value="${reteta.idReteta}">Reteta #${reteta.idReteta} · ${reteta.dataEmitere || "fara data"} · ${label} · ${money(total)}</option>`;
    }).join("");
    syncInvoiceMedicineCostFromPrescription();
}

function getPatientHospitalizations(idPacient, internari = appData?.internari || []) {
    const id = Number(idPacient || 0);
    if (!id) {
        return [];
    }
    return (internari || [])
        .filter((internare) => Number(internare.idPacient) === id)
        .sort((a, b) => {
            const activeDiff = Number(b.status === "activa") - Number(a.status === "activa");
            if (activeDiff) return activeDiff;
            return String(b.dataInternare || "").localeCompare(String(a.dataInternare || ""));
        });
}

function fillInvoiceHospitalizationSelect() {
    const patientInput = document.getElementById("invoicePatientId");
    const select = document.getElementById("invoiceHospitalizationSelect");
    if (!select || !appData) {
        syncInvoiceHospitalizationCost();
        return;
    }
    const idPacient = Number(patientInput?.value || 0);
    const internariPacient = getPatientHospitalizations(idPacient, appData.internari || []);
    select.innerHTML = '<option value="">Fara internare / 0 lei</option>' + internariPacient.map((internare) => {
        const status = internare.status === "activa" ? "activa" : "finalizata";
        return `<option value="${internare.idInternare}">Internare #${internare.idInternare} · ${internare.sectie || "sectie"} · ${internare.numarZile || 0} zile · ${status} · ${money(internare.costTotal || 0)}</option>`;
    }).join("");
    const active = internariPacient.find((internare) => internare.status === "activa") || internariPacient[0];
    if (active) {
        select.value = String(active.idInternare);
    }
    syncInvoiceHospitalizationCost();
}

function syncInvoiceHospitalizationCost() {
    const select = document.getElementById("invoiceHospitalizationSelect");
    const input = document.getElementById("invoiceHospitalization");
    const summary = document.getElementById("invoiceHospitalizationSummary");
    const idInternare = Number(select?.value || 0);
    const internare = idInternare ? appData?.internari?.find((item) => Number(item.idInternare) === idInternare) : null;
    const total = Number(internare?.costTotal || 0);
    if (input) {
        input.value = total.toFixed(2);
    }
    if (summary) {
        summary.innerHTML = internare
            ? `<strong>Internare selectata:</strong> #${internare.idInternare} · ${internare.sectie || "sectie"} · ${internare.numarZile || 0} zile<br><strong>Cost internare:</strong> ${money(total)}`
            : "Selecteaza pacientul pentru ca internarea sa intre automat in total.";
    }
    updateInvoicePreview();
}

function syncInvoiceMedicineCostFromPrescription() {
    const select = document.getElementById("invoicePrescriptionSelect");
    const medicineInput = document.getElementById("invoiceMedicine");
    const summary = document.getElementById("invoicePrescriptionSummary");
    const idReteta = Number(select?.value || 0);
    const reteta = idReteta ? appData?.retete?.find((item) => Number(item.idReteta) === idReteta) : null;
    const total = getPrescriptionMedicineTotal(reteta, appData?.medicamente || []);
    if (medicineInput) {
        medicineInput.value = total.toFixed(2);
    }
    if (summary) {
        summary.innerHTML = reteta
            ? `<strong>Medicamente selectate:</strong> ${getPrescriptionMedicinesLabel(reteta)}<br><strong>Total medicamente:</strong> ${money(total)}`
            : "Selecteaza o reteta pentru ca medicamentele sa intre automat in total.";
    }
    updateInvoicePreview();
}

function updateInvoicePreview() {
    const consultatie = Number(document.getElementById("invoiceConsultation")?.value || 0);
    const internare = Number(document.getElementById("invoiceHospitalization")?.value || 0);
    const tratament = Number(document.getElementById("invoiceTreatment")?.value || 0);
    const medicamente = Number(document.getElementById("invoiceMedicine")?.value || 0);
    const reducere = Number(document.getElementById("invoiceDiscount")?.value || 0);
    const total = Math.max(0, consultatie + internare + tratament + medicamente - reducere);
    const preview = document.getElementById("invoiceTotalPreview");
    if (preview) {
        preview.textContent = money(total);
    }
    return total;
}

async function submitInvoice(event) {
    event.preventDefault();
    if (!requirePermission("invoices", "create")) {
        return;
    }
    const data = await loadAll();
    const idPacient = Number(document.getElementById("invoicePatientId").value);
    const idReteta = Number(document.getElementById("invoicePrescriptionSelect")?.value || 0);
    const reteta = idReteta ? data.retete.find((item) => Number(item.idReteta) === idReteta) : null;
    const idInternare = Number(document.getElementById("invoiceHospitalizationSelect")?.value || 0);
    const internare = idInternare ? data.internari.find((item) => Number(item.idInternare) === idInternare) : null;
    if (internare && Number(internare.idPacient) !== idPacient) {
        showToast("Internarea selectata nu apartine pacientului ales.", "error");
        return;
    }
    if (internare) {
        document.getElementById("invoiceHospitalization").value = Number(internare.costTotal || 0).toFixed(2);
    }
    if (reteta && Number(reteta.idPacient) !== idPacient) {
        showToast("Reteta selectata nu apartine pacientului ales.", "error");
        return;
    }
    if (reteta) {
        document.getElementById("invoiceMedicine").value = getPrescriptionMedicineTotal(reteta, data.medicamente || []).toFixed(2);
    }
    const costuri = [
        Number(document.getElementById("invoiceConsultation").value),
        Number(document.getElementById("invoiceHospitalization").value),
        Number(document.getElementById("invoiceTreatment").value),
        Number(document.getElementById("invoiceMedicine").value),
        Number(document.getElementById("invoiceDiscount").value)
    ];
    if (!byId(data.pacienti, idPacient)) {
        showToast("Pacientul nu exista.", "error");
        return;
    }
    if (costuri.some((cost) => cost < 0)) {
        showToast("Costurile facturii nu pot fi negative.", "error");
        return;
    }
    const factura = {
        idFactura: nextId(data.facturi, "idFactura"),
        idPacient,
        dataEmitere: document.getElementById("invoiceDate").value,
        costConsultatie: Number(document.getElementById("invoiceConsultation").value),
        costInternare: Number(document.getElementById("invoiceHospitalization").value),
        idInternare: idInternare || null,
        costTratament: Number(document.getElementById("invoiceTreatment").value),
        idReteta: idReteta || null,
        medicamenteFactura: reteta ? getPrescriptionMedicinesLabel(reteta) : "",
        costMedicamente: Number(document.getElementById("invoiceMedicine").value),
        reducere: Number(document.getElementById("invoiceDiscount").value),
        total: updateInvoicePreview()
    };
    data.facturi.push(factura);
    saveData();
    closeModal("invoiceModal");
    resetPage();
    permanentSaveToast("Factura emisa temporar.");
}

function fillPrescriptionMedicineSelect() {
    const select = document.getElementById("prescriptionMedicineSelect");
    if (!select || !appData) {
        return;
    }
    const options = (appData.medicamente || [])
        .map((medicament) => `<option value="${medicament.idMedicament}">${medicament.denumire} - ${money(medicament.pretUnitar)} / buc. · stoc ${medicament.stoc}</option>`)
        .join("");
    select.innerHTML = options || '<option value="">Nu exista medicamente in farmacie</option>';
}

function updatePrescriptionMedicinePreview() {
    const list = document.getElementById("selectedPrescriptionMedicines");
    const totalEl = document.getElementById("prescriptionMedicineTotal");
    const total = selectedPrescriptionMedicines.reduce((sum, item) => sum + Number(item.subtotal || 0), 0);
    if (totalEl) {
        totalEl.textContent = money(total);
    }
    if (!list) {
        return total;
    }
    if (!selectedPrescriptionMedicines.length) {
        list.innerHTML = '<span class="muted">Nu a fost selectat niciun medicament.</span>';
        return total;
    }
    list.innerHTML = selectedPrescriptionMedicines.map((item, index) => `
        <div class="selected-medicine-row">
            <span>${item.denumire} x${item.cantitate}</span>
            <strong>${money(item.subtotal)}</strong>
            <button class="action danger" type="button" data-remove-prescription-medicine="${index}">Sterge</button>
        </div>
    `).join("");
    list.querySelectorAll("[data-remove-prescription-medicine]").forEach((button) => {
        button.addEventListener("click", () => {
            selectedPrescriptionMedicines.splice(Number(button.dataset.removePrescriptionMedicine), 1);
            updatePrescriptionMedicinePreview();
        });
    });
    return total;
}

function addPrescriptionMedicineFromSelect() {
    const id = Number(document.getElementById("prescriptionMedicineSelect")?.value || 0);
    const cantitate = Number(document.getElementById("prescriptionMedicineQuantity")?.value || 0);
    const medicament = byMedicineId(appData?.medicamente || [], id);
    if (!medicament || cantitate <= 0) {
        showToast("Alege un medicament si o cantitate valida.", "error");
        return;
    }
    if (cantitate > Number(medicament.stoc || 0)) {
        showToast("Cantitatea depaseste stocul disponibil in farmacie.", "error");
        return;
    }
    const existent = selectedPrescriptionMedicines.find((item) => Number(item.idMedicament) === id);
    if (existent) {
        const nouaCantitate = Number(existent.cantitate) + cantitate;
        if (nouaCantitate > Number(medicament.stoc || 0)) {
            showToast("Cantitatea totala depaseste stocul disponibil.", "error");
            return;
        }
        existent.cantitate = nouaCantitate;
        existent.subtotal = Number(medicament.pretUnitar || 0) * nouaCantitate;
    } else {
        selectedPrescriptionMedicines.push({
            idMedicament: medicament.idMedicament,
            denumire: medicament.denumire,
            pretUnitar: Number(medicament.pretUnitar || 0),
            cantitate,
            subtotal: Number(medicament.pretUnitar || 0) * cantitate
        });
    }
    updatePrescriptionMedicinePreview();
}

async function submitPrescription(event) {
    event.preventDefault();
    if (!requirePermission("prescriptions", "create")) {
        return;
    }
    const data = await loadAll();
    const currentUser = getCurrentUser();
    const idPacient = Number(document.getElementById("prescriptionPatientId").value);
    const idMedic = currentUser?.role === "medic" ? Number(currentUser.doctorId) : Number(document.getElementById("prescriptionDoctorId").value);

    if (!byId(data.pacienti, idPacient)) {
        showToast("Pacientul nu exista.", "error");
        return;
    }
    if (!byId(data.medici, idMedic)) {
        showToast("Medicul nu exista.", "error");
        return;
    }
    if (!selectedPrescriptionMedicines.length) {
        showToast("Alege cel putin un medicament din farmacie.", "error");
        return;
    }

    const medicamenteSelectate = selectedPrescriptionMedicines.map((item) => {
        const medicament = byMedicineId(data.medicamente, item.idMedicament);
        return {
            idMedicament: item.idMedicament,
            denumire: medicament?.denumire || item.denumire,
            pretUnitar: Number(medicament?.pretUnitar ?? item.pretUnitar),
            cantitate: Number(item.cantitate),
            subtotal: Number(medicament?.pretUnitar ?? item.pretUnitar) * Number(item.cantitate)
        };
    });
    const costMedicamente = medicamenteSelectate.reduce((sum, item) => sum + Number(item.subtotal || 0), 0);
    const reteta = {
        idReteta: nextId(data.retete, "idReteta"),
        idPacient,
        idMedic,
        medicamente: medicamenteSelectate.map((item) => `${item.denumire} x${item.cantitate}`).join(", "),
        medicamenteSelectate,
        costMedicamente,
        dozaj: document.getElementById("prescriptionDosage").value.trim(),
        durataTratament: document.getElementById("prescriptionDuration").value.trim(),
        dataEmitere: document.getElementById("prescriptionDate").value
    };
    data.retete.push(reteta);
    saveData();
    selectedPrescriptionMedicines = [];
    closeModal("prescriptionModal");
    resetPage();
    permanentSaveToast(`Reteta emisa temporar. Total medicamente: ${money(costMedicamente)}.`);
}

async function generateVisualReport() {
    if (!requirePermission("reports", "export")) {
        return;
    }
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
    if (!requirePermission("reports", "export")) {
        return;
    }
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
        ["idFactura", "idPacient", "dataEmitere", "costConsultatie", "costInternare", "costTratament", "idReteta", "costMedicamente", "reducere", "total"],
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
        appointmentButton.addEventListener("click", () => {
            if (requirePermission("appointments", "create")) {
                openModal("appointmentModal");
            }
        });
        appointmentForm?.addEventListener("submit", submitAppointment);
    }

    const hospitalizationButton = document.getElementById("newHospitalizationBtn");
    const hospitalizationForm = document.getElementById("hospitalizationForm");
    if (hospitalizationButton && hospitalizationButton.dataset.modalReady !== "true") {
        hospitalizationButton.dataset.modalReady = "true";
        hospitalizationButton.addEventListener("click", () => {
            if (requirePermission("admissions", "create")) {
                openModal("hospitalizationModal");
            }
        });
        hospitalizationForm?.addEventListener("submit", submitHospitalization);
    }

    const invoiceButton = document.getElementById("newInvoiceBtn");
    const invoiceForm = document.getElementById("invoiceForm");
    if (invoiceButton && invoiceButton.dataset.modalReady !== "true") {
        invoiceButton.dataset.modalReady = "true";
        invoiceButton.addEventListener("click", () => {
            if (!requirePermission("invoices", "create")) {
                return;
            }
            document.getElementById("invoiceDate").value = new Date().toISOString().slice(0, 10);
            fillInvoicePrescriptionSelect();
            fillInvoiceHospitalizationSelect();
            updateInvoicePreview();
            openModal("invoiceModal");
        });
        invoiceForm?.addEventListener("submit", submitInvoice);
        document.getElementById("invoicePatientId")?.addEventListener("input", () => {
            fillInvoicePrescriptionSelect();
            fillInvoiceHospitalizationSelect();
        });
        document.getElementById("invoicePrescriptionSelect")?.addEventListener("change", syncInvoiceMedicineCostFromPrescription);
        document.getElementById("invoiceHospitalizationSelect")?.addEventListener("change", syncInvoiceHospitalizationCost);
        document.querySelectorAll("[data-invoice-total]").forEach((input) => {
            input.addEventListener("input", updateInvoicePreview);
        });
    }

    const prescriptionButton = document.getElementById("newPrescriptionBtn");
    const prescriptionForm = document.getElementById("prescriptionForm");
    if (prescriptionButton && prescriptionButton.dataset.modalReady !== "true") {
        prescriptionButton.dataset.modalReady = "true";
        prescriptionButton.addEventListener("click", () => {
            if (requirePermission("prescriptions", "create")) {
                const currentUser = getCurrentUser();
                const doctorInput = document.getElementById("prescriptionDoctorId");
                if (currentUser?.role === "medic" && doctorInput) {
                    doctorInput.value = currentUser.doctorId;
                    doctorInput.readOnly = true;
                }
                document.getElementById("prescriptionDate").value = new Date().toISOString().slice(0, 10);
                selectedPrescriptionMedicines = [];
                fillPrescriptionMedicineSelect();
                updatePrescriptionMedicinePreview();
                openModal("prescriptionModal");
            }
        });
        prescriptionForm?.addEventListener("submit", submitPrescription);
        document.getElementById("addPrescriptionMedicineBtn")?.addEventListener("click", addPrescriptionMedicineFromSelect);
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
    if (!requirePermission("admissions", "create")) {
        return;
    }
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
    if (!requirePermission("admissions", "discharge")) {
        return;
    }
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
    const intrare = [...(appData.intrari || [])].reverse().find((item) => Number(item.idPacient) === Number(id));
    if (intrare) {
        intrare.status = "externat";
    }
    saveData();
    resetPage();
}

function canManageAppointment(programare, action) {
    const role = getCurrentRole();
    const currentUser = getCurrentUser();
    if (role === "admin") {
        return hasPermission("appointments", action);
    }
    if (role === "receptie") {
        return action === "cancel" && hasPermission("appointments", "cancel");
    }
    if (role === "medic" && Number(programare.idMedic) === Number(currentUser?.doctorId)) {
        return hasPermission("appointments", `${action}_own`);
    }
    return false;
}

function renderAppointmentActions(programare) {
    if (programare.status === "anulata" || programare.status === "finalizata") {
        return "-";
    }
    const actions = [];
    if (canManageAppointment(programare, "finish")) {
        actions.push(`<button class="action success" data-action="finish" data-id="${programare.idProgramare}">Finalizeaza</button>`);
    }
    if (canManageAppointment(programare, "cancel")) {
        actions.push(`<button class="action danger" data-action="cancel" data-id="${programare.idProgramare}">Anuleaza</button>`);
    }
    return actions.join("") || "-";
}

function updateAppointmentStatus(idProgramare, action) {
    const programare = appData.programari.find((p) => Number(p.idProgramare) === Number(idProgramare));
    if (!programare) {
        showToast("Programarea nu a fost gasita.", "error");
        return;
    }
    const permissionAction = action === "finish" ? "finish" : "cancel";
    if (!canManageAppointment(programare, permissionAction)) {
        showToast("Nu aveti permisiune pentru aceasta actiune.", "error");
        return;
    }
    programare.status = action === "finish" ? "finalizata" : "anulata";
    saveData();
    resetPage();
    showToast(action === "finish" ? "Programare finalizata temporar." : "Programare anulata temporar.", "success");
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

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const data = await loadAll();
        const user = data.users.find((item) => item.username === username);

        if (user && user.active === false) {
            document.getElementById("loginError").textContent = "Cont dezactivat.";
            showToast("Cont dezactivat.", "error");
            return;
        }

        if (user && user.password === password) {
            const profile = normalizeUserProfile(user);
            if (profile.role === "medic" && !profile.doctorId) {
                document.getElementById("loginError").textContent = "Contul medicului nu are doctorId asociat.";
                showToast("Cont medic configurat incomplet.", "error");
                return;
            }
            localStorage.setItem("hospitalUser", username);
            localStorage.setItem("hospitalRole", profile.role);
            localStorage.setItem("hospitalCurrentUser", JSON.stringify(profile));
            window.location.href = profile.role === "farmacie" ? "farmacie.html" : "dashboard.html";
            return;
        }

        if (users[username] === password && userProfiles[username]) {
            const profile = { ...userProfiles[username] };
            localStorage.setItem("hospitalUser", username);
            localStorage.setItem("hospitalRole", profile.role);
            localStorage.setItem("hospitalCurrentUser", JSON.stringify(profile));
            window.location.href = profile.role === "farmacie" ? "farmacie.html" : "dashboard.html";
            return;
        }

        document.getElementById("loginError").textContent = "Username sau parola gresita.";
        showToast("Datele introduse nu sunt corecte.", "error");
    });
}

async function renderDashboard() {
    if (!document.getElementById("totalPacienti")) {
        return;
    }

    const rawData = await loadAll();
    const data = getRoleScopedData(rawData);
    updateUserChip(rawData);
    renderDashboardByRole(data);

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
    const moneyCard = document.querySelector(".money-stat");
    if (getCurrentRole() === "medic") {
        moneyCard?.classList.add("hidden");
    } else {
        moneyCard?.classList.remove("hidden");
    }
    const moneyLabel = moneyCard?.querySelector("span");
    if (moneyLabel) {
        moneyLabel.textContent = getCurrentRole() === "receptie" ? "Facturi emise" : "Venit total";
    }
    document.getElementById("totalFacturi").textContent = getCurrentRole() === "receptie"
        ? data.statistici.totalFacturi
        : money(data.statistici.venitTotal);
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
            <li>Medicamente in stoc: ${(data.medicamente || []).length}</li>
        `;
    }
}

function renderDashboardByRole(data) {
    const title = document.querySelector(".dashboard-hero h1");
    const subtitle = document.querySelector(".dashboard-hero > div > p:not(.eyebrow)");
    const role = getCurrentRole();

    if (title) {
        title.textContent = role === "medic"
            ? "Dashboard medic"
            : role === "receptie"
                ? "Dashboard receptie"
                : "Dashboard administrator";
    }
    if (subtitle) {
        subtitle.textContent = role === "medic"
            ? "Pacientii, programarile si activitatea medicala asociata contului curent."
            : role === "receptie"
                ? "Gestionarea pacientilor, programarilor, internarilor si facturilor."
                : "Imagine generala asupra activitatii spitalului.";
    }

    document.querySelectorAll(".command-actions a").forEach((link) => {
        const href = link.getAttribute("href");
        const allowed = pageAccessByRole[role]?.includes(href);
        link.hidden = !allowed;
    });

    const financePanel = document.querySelector(".finance-box")?.closest(".panel");
    if (financePanel) {
        financePanel.hidden = role === "medic";
    }
}

async function renderPacienti() {
    const table = document.getElementById("pacientiTable");
    if (!table) {
        return;
    }

    const rawData = await loadAll();
    const data = getRoleScopedData(rawData);
    const search = document.getElementById("searchName");
    const filter = document.getElementById("filterDiagnostic");
    const status = document.getElementById("filterStatus");
    const priority = document.getElementById("filterPriority");
    const sort = document.getElementById("sortName");
    const resetFilters = document.getElementById("resetFilters");
    let sortAsc = false;

    const selectedDiagnostic = filter.value;
    const title = document.querySelector(".page-header h1");
    const subtitle = document.querySelector(".page-header p");
    if (title && getCurrentRole() === "medic") {
        title.textContent = "Pacientii mei";
    }
    if (subtitle && getCurrentRole() === "medic") {
        subtitle.textContent = "Pacientii care au programari la medicul autentificat.";
    }

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
                <td class="delete-cell">${
                    hasPermission("patients", "delete")
                        ? `<button class="delete-icon" data-action="delete" data-id="${p.id}" aria-label="Sterge pacient">X</button>`
                        : ""
                }</td>
                <td>${p.id}</td><td>${p.nume} ${p.prenume}</td><td>${p.varsta}</td><td>${p.telefon || "-"}</td>
                <td>${p.diagnostic}</td><td>${p.grupaSange}</td>
                <td><span class="priority-badge priority-${p.prioritate || "medie"}">${p.prioritate || "medie"}</span></td>
                <td><span class="status-badge ${p.internat ? "status-internat" : "status-neinternat"}">${p.internat ? "Internat" : "Neinternat"}</span></td>
                <td class="actions-cell">
                    ${hasPermission("patients", "edit") || hasPermission("patients", "medical_edit")
                        ? `<button class="action" data-action="edit" data-id="${p.id}">${getCurrentRole() === "medic" ? "Actualizeaza diagnostic" : "Editeaza"}</button>`
                        : "-"}
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
    const data = getRoleScopedData(await loadAll());
    const search = document.getElementById("mediciSearch");
    const role = getCurrentRole();
    const title = document.querySelector(".page-header h1");
    const subtitle = document.querySelector(".page-header p");
    if (title && role === "medic") title.textContent = "Profilul meu medical";
    if (subtitle && role === "medic") subtitle.textContent = "Datele medicului autentificat.";
    const draw = () => {
        const query = (search?.value || "").toLowerCase();
        table.innerHTML = data.medici
            .filter((m) => `${m.nume} ${m.prenume} ${m.specializare} ${m.sectie}`.toLowerCase().includes(query))
            .map((m) => {
                const account = appData.users.find((user) => Number(user.doctorId) === Number(m.id) && user.role === "medic");
                return `<tr>
                <td>${m.id}</td><td>${m.nume}</td><td>${m.prenume}</td><td>${m.sectie}</td>
                <td>${m.specializare}</td><td>${m.codParafa}</td><td>${m.numarConsultatii}</td>
                <td>${account ? `${account.username} / ${account.active === false ? "inactiv" : "activ"}` : "fara cont"}</td>
                <td class="actions-cell">
                    ${hasPermission("doctors", "edit") ? `<button class="action" data-action="edit-doctor" data-id="${m.id}">Editeaza</button>` : ""}
                    ${hasPermission("doctors", "delete") ? `<button class="action danger" data-action="delete-doctor" data-id="${m.id}">Sterge</button>` : ""}
                    ${!hasPermission("doctors", "edit") && !hasPermission("doctors", "delete") ? `<button class="action" data-action="doctor-details" data-id="${m.id}">Detalii</button>` : ""}
                </td>
            </tr>`;
            }).join("");
        table.querySelectorAll("button[data-action]").forEach((button) => {
            button.addEventListener("click", () => {
                const id = Number(button.dataset.id);
                if (button.dataset.action === "edit-doctor") openDoctorModal(id);
                if (button.dataset.action === "delete-doctor") deleteDoctor(id);
                if (button.dataset.action === "doctor-details") showToast("Detaliile medicului sunt afisate in randul selectat.", "info");
            });
        });
    };
    search?.addEventListener("input", draw);
    draw();
}

async function renderProgramari() {
    const table = document.getElementById("programariTable");
    if (!table) {
        return;
    }
    const rawData = await loadAll();
    const data = getRoleScopedData(rawData);
    const search = document.getElementById("programariSearch");
    const draw = () => {
        const query = (search?.value || "").toLowerCase();
        table.innerHTML = data.programari.map((p) => {
            const pacient = byId(rawData.pacienti, p.idPacient);
            const medic = byId(rawData.medici, p.idMedic);
            const rowText = `${pacient?.nume || ""} ${pacient?.prenume || ""} ${medic?.nume || ""} ${p.tipConsultatie} ${p.status}`.toLowerCase();
            if (!rowText.includes(query)) return "";
            const statusClass = p.status === "finalizata" ? "status-finalizat" :
                p.status === "anulata" ? "status-anulat" : "status-active";
            return `<tr>
                <td>${p.idProgramare}</td><td>${pacient ? `${pacient.nume} ${pacient.prenume}` : p.idPacient}</td>
                <td>${medic ? `${medic.nume} ${medic.prenume}` : p.idMedic}</td>
                <td>${p.data}</td><td>${p.ora}</td><td>${p.tipConsultatie}</td>
                <td><span class="status-badge ${statusClass}">${p.status}</span></td>
                <td class="actions-cell">${renderAppointmentActions(p)}</td>
            </tr>`;
        }).join("");

        table.querySelectorAll("button[data-action]").forEach((button) => {
            button.addEventListener("click", () => updateAppointmentStatus(Number(button.dataset.id), button.dataset.action));
        });
    };
    search?.addEventListener("input", draw);
    draw();
}

async function renderInternari() {
    const table = document.getElementById("internariTable");
    if (!table) {
        return;
    }
    const rawData = await loadAll();
    const data = getRoleScopedData(rawData);
    const search = document.getElementById("internariSearch");
    const draw = () => {
        const query = (search?.value || "").toLowerCase();
        table.innerHTML = data.internari.map((i) => {
            const pacient = byId(rawData.pacienti, i.idPacient);
            const rowText = `${pacient?.nume || ""} ${pacient?.prenume || ""} ${i.sectie} ${i.status}`.toLowerCase();
            if (!rowText.includes(query)) return "";
            return `<tr>
                <td>${i.idInternare}</td><td>${pacient ? `${pacient.nume} ${pacient.prenume}` : i.idPacient}</td>
                <td>${i.sectie}</td><td>${i.dataInternare}</td><td>${i.numarZile}</td>
                <td>${i.tipSalon}</td><td><span class="status-badge ${i.status === "activa" ? "status-active" : "status-finalizat"}">${i.status}</span></td>
                <td><strong>${money(i.costTotal)}</strong></td>
                <td class="actions-cell">
                    ${i.status === "activa" && hasPermission("admissions", "discharge")
                        ? `<button class="action danger" data-action="extern" data-id="${i.idPacient}">Externeaza</button>`
                        : "-"}
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
    const rawData = await loadAll();
    const data = getRoleScopedData(rawData);
    const search = document.getElementById("facturiSearch");
    const draw = () => {
        const query = (search?.value || "").toLowerCase();
        table.innerHTML = data.facturi.map((f) => {
            const pacient = byId(rawData.pacienti, f.idPacient);
            const rowText = `${pacient?.nume || ""} ${pacient?.prenume || ""} ${f.dataEmitere}`.toLowerCase();
            if (!rowText.includes(query)) return "";
            const reteta = f.idReteta ? rawData.retete.find((item) => Number(item.idReteta) === Number(f.idReteta)) : null;
            const retetaLabel = reteta ? `#${reteta.idReteta} · ${getPrescriptionMedicinesLabel(reteta)}` : (f.medicamenteFactura || "-");
            return `<tr>
                <td>${f.idFactura}</td><td>${pacient ? `${pacient.nume} ${pacient.prenume}` : f.idPacient}</td>
                <td>${f.dataEmitere}</td><td>${money(f.costConsultatie)}</td><td>${money(f.costInternare)}</td>
                <td>${money(f.costTratament)}</td><td>${retetaLabel}</td><td>${money(f.costMedicamente)}</td><td>${money(f.reducere)}</td><td><strong>${money(f.total)}</strong></td>
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
    const rawData = await loadAll();
    const data = getRoleScopedData(rawData);
    table.innerHTML = data.istoric.map((i) => {
        const pacient = byId(rawData.pacienti, i.idPacient);
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
    const rawData = await loadAll();
    const data = getRoleScopedData(rawData);
    table.innerHTML = data.retete.map((r) => {
        const pacient = byId(rawData.pacienti, r.idPacient);
        const medic = byId(rawData.medici, r.idMedic);
        const totalMedicamente = Number(r.costMedicamente || 0);
        return `<tr>
            <td>${r.idReteta}</td><td>${pacient ? `${pacient.nume} ${pacient.prenume}` : r.idPacient}</td>
            <td>${medic ? `${medic.nume} ${medic.prenume}` : r.idMedic}</td>
            <td>${formatPrescriptionMedicines(r)}</td><td>${r.dozaj}</td><td>${r.durataTratament}</td><td>${r.dataEmitere}</td>
            <td><strong>${money(totalMedicamente)}</strong></td>
        </tr>`;
    }).join("");
}

function formatPrescriptionMedicines(reteta) {
    if (Array.isArray(reteta.medicamenteSelectate) && reteta.medicamenteSelectate.length) {
        return reteta.medicamenteSelectate
            .map((item) => `${item.denumire} x${item.cantitate} (${money(item.subtotal)})`)
            .join("<br>");
    }
    return reteta.medicamente || "-";
}

function byMedicineId(items, id) {
    return items.find((item) => Number(item.idMedicament) === Number(id));
}

function fillMedicineForm(medicament = {}) {
    document.getElementById("medicineId").value = medicament.idMedicament || "";
    document.getElementById("medicineName").value = medicament.denumire || "";
    document.getElementById("medicineSubstance").value = medicament.substantaActiva || "";
    document.getElementById("medicinePrice").value = medicament.pretUnitar || 0;
    document.getElementById("medicineStock").value = medicament.stoc || 0;
    document.getElementById("medicineNeedsPrescription").value = medicament.necesitaReteta || "nu";
}

function openMedicineModal(id = null) {
    if (!requirePermission("pharmacy", id ? "edit" : "create")) {
        return;
    }
    const medicament = id ? byMedicineId(appData.medicamente, id) : {};
    if (id && !medicament) {
        showToast("Medicamentul nu a fost gasit.", "error");
        return;
    }
    document.getElementById("medicineModalTitle").textContent = id ? "Editare medicament" : "Adauga medicament";
    document.getElementById("medicineSubmitBtn").textContent = id ? "Salveaza modificarile" : "Adauga medicament";
    fillMedicineForm(medicament);
    openModal("medicineModal");
}

function saveMedicineFromModal(event) {
    event.preventDefault();
    const isEdit = Boolean(document.getElementById("medicineId").value);
    if (!requirePermission("pharmacy", isEdit ? "edit" : "create")) {
        return;
    }
    const medicament = {
        idMedicament: Number(document.getElementById("medicineId").value) || nextId(appData.medicamente, "idMedicament"),
        denumire: document.getElementById("medicineName").value.trim(),
        substantaActiva: document.getElementById("medicineSubstance").value.trim(),
        pretUnitar: Number(document.getElementById("medicinePrice").value),
        stoc: Number(document.getElementById("medicineStock").value),
        necesitaReteta: document.getElementById("medicineNeedsPrescription").value
    };
    if (!medicament.denumire || !medicament.substantaActiva || medicament.pretUnitar < 0 || medicament.stoc < 0) {
        showToast("Date invalide pentru medicament.", "error");
        return;
    }
    const index = appData.medicamente.findIndex((item) => Number(item.idMedicament) === Number(medicament.idMedicament));
    if (index >= 0) {
        appData.medicamente[index] = medicament;
    } else {
        appData.medicamente.push(medicament);
    }
    saveData();
    closeModal("medicineModal");
    resetPage();
    permanentSaveToast(isEdit ? "Medicament actualizat temporar." : "Medicament adaugat temporar.");
}

function updatePurchasePreview() {
    const id = Number(document.getElementById("purchaseMedicineId")?.value || 0);
    const cantitate = Number(document.getElementById("purchaseQuantity")?.value || 0);
    const medicament = byMedicineId(appData?.medicamente || [], id);
    const total = medicament ? medicament.pretUnitar * cantitate : 0;
    const preview = document.getElementById("purchaseTotalPreview");
    if (preview) {
        preview.textContent = money(total);
    }
    return total;
}

function openPurchaseModal(id) {
    if (!requirePermission("pharmacy", "sell")) {
        return;
    }
    const medicament = byMedicineId(appData.medicamente, id);
    if (!medicament) {
        showToast("Medicamentul nu a fost gasit.", "error");
        return;
    }
    document.getElementById("purchaseMedicineId").value = medicament.idMedicament;
    document.getElementById("purchasePatientId").value = "";
    document.getElementById("purchaseQuantity").value = 1;
    document.getElementById("purchaseDate").value = new Date().toISOString().slice(0, 10);
    updatePurchasePreview();
    openModal("purchaseModal");
}

function savePurchaseFromModal(event) {
    event.preventDefault();
    if (!requirePermission("pharmacy", "sell")) {
        return;
    }
    const idMedicament = Number(document.getElementById("purchaseMedicineId").value);
    const idPacient = Number(document.getElementById("purchasePatientId").value);
    const cantitate = Number(document.getElementById("purchaseQuantity").value);
    const idReteta = 0;
    const medicament = byMedicineId(appData.medicamente, idMedicament);
    const pacient = byId(appData.pacienti, idPacient);
    const reteta = null;
    if (!medicament || !pacient || cantitate <= 0 || cantitate > Number(medicament.stoc)) {
        showToast("Verifica pacientul, medicamentul si stocul disponibil.", "error");
        return;
    }
    const pretTotal = medicament.pretUnitar * cantitate;
    medicament.stoc -= cantitate;
    appData.achizitii.push({
        idAchizitie: nextId(appData.achizitii, "idAchizitie"),
        idPacient,
        idMedicament,
        cantitate,
        pretTotal,
        dataAchizitie: document.getElementById("purchaseDate").value,
        idReteta
    });
    saveData();
    closeModal("purchaseModal");
    resetPage();
    permanentSaveToast("Achizitie medicamente adaugata temporar.");
}

function deleteMedicine(id) {
    if (!requirePermission("pharmacy", "delete")) {
        return;
    }
    appData.medicamente = appData.medicamente.filter((item) => Number(item.idMedicament) !== Number(id));
    saveData();
    resetPage();
    showToast("Medicament sters temporar din interfata.", "warning");
}

function setupPharmacyModals() {
    setupModalCloseHandlers();
    const addButton = document.getElementById("addMedicineBtn");
    const medicineForm = document.getElementById("medicineForm");
    const purchaseForm = document.getElementById("purchaseForm");
    const quantity = document.getElementById("purchaseQuantity");
    if (addButton && addButton.dataset.modalReady !== "true") {
        addButton.dataset.modalReady = "true";
        addButton.addEventListener("click", () => openMedicineModal());
    }
    if (medicineForm && medicineForm.dataset.modalReady !== "true") {
        medicineForm.dataset.modalReady = "true";
        medicineForm.addEventListener("submit", saveMedicineFromModal);
    }
    if (purchaseForm && purchaseForm.dataset.modalReady !== "true") {
        purchaseForm.dataset.modalReady = "true";
        purchaseForm.addEventListener("submit", savePurchaseFromModal);
    }
    quantity?.addEventListener("input", updatePurchasePreview);
}

async function renderFarmacie() {
    const table = document.getElementById("farmacieTable");
    if (!table) {
        return;
    }
    const data = getRoleScopedData(await loadAll());
    const search = document.getElementById("medicineSearch");
    const filter = document.getElementById("medicinePrescriptionFilter");
    const value = data.medicamente.reduce((sum, item) => sum + Number(item.pretUnitar || 0) * Number(item.stoc || 0), 0);
    document.getElementById("medicineTypes").textContent = data.medicamente.length;
    document.getElementById("medicineStockValue").textContent = money(value);
    document.getElementById("medicinePurchases").textContent = data.achizitii.length;

    const draw = () => {
        const query = (search?.value || "").toLowerCase();
        const prescriptionFilter = filter?.value || "toate";
        table.innerHTML = data.medicamente
            .filter((item) => `${item.denumire} ${item.substantaActiva}`.toLowerCase().includes(query))
            .filter((item) => prescriptionFilter === "toate" || item.necesitaReteta === prescriptionFilter)
            .map((item) => `<tr>
                <td>${item.idMedicament}</td><td>${item.denumire}</td><td>${item.substantaActiva}</td>
                <td>${money(item.pretUnitar)}</td><td>${item.stoc}</td>
                <td><span class="tag ${item.necesitaReteta === "da" ? "warning" : "success"}">${item.necesitaReteta === "da" ? "Da" : "Nu"}</span></td>
                <td class="actions-cell">
                    ${hasPermission("pharmacy", "sell") ? `<button class="action success" data-action="sell-medicine" data-id="${item.idMedicament}">Vinde</button>` : ""}
                    ${hasPermission("pharmacy", "edit") ? `<button class="action" data-action="edit-medicine" data-id="${item.idMedicament}">Editeaza</button>` : ""}
                    ${hasPermission("pharmacy", "delete") ? `<button class="action danger" data-action="delete-medicine" data-id="${item.idMedicament}">Sterge</button>` : ""}
                    ${!hasPermission("pharmacy", "sell") && !hasPermission("pharmacy", "edit") ? "Vizualizare" : ""}
                </td>
            </tr>`).join("");

        table.querySelectorAll("button[data-action]").forEach((button) => {
            button.addEventListener("click", () => {
                const id = Number(button.dataset.id);
                if (button.dataset.action === "sell-medicine") openPurchaseModal(id);
                if (button.dataset.action === "edit-medicine") openMedicineModal(id);
                if (button.dataset.action === "delete-medicine") deleteMedicine(id);
            });
        });
    };
    search?.addEventListener("input", draw);
    filter?.addEventListener("change", draw);
    draw();

    const purchasesTable = document.getElementById("achizitiiTable");
    if (purchasesTable) {
        purchasesTable.innerHTML = data.achizitii.map((achizitie) => {
            const pacient = byId(appData.pacienti, achizitie.idPacient);
            const medicament = byMedicineId(appData.medicamente, achizitie.idMedicament);
            return `<tr>
                <td>${achizitie.idAchizitie}</td>
                <td>${pacient ? `${pacient.nume} ${pacient.prenume}` : achizitie.idPacient}</td>
                <td>${medicament ? medicament.denumire : achizitie.idMedicament}</td>
                <td>${achizitie.cantitate}</td><td>${money(achizitie.pretTotal)}</td>
                <td>${achizitie.dataAchizitie}</td>
            </tr>`;
        }).join("");
    }
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
setupDoctorModals();
setupActionModals();
setupPharmacyModals();
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
renderFarmacie();
renderRaport();
