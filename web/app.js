const emptyData = {
    pacienti: [],
    medici: [],
    programari: [],
    internari: [],
    facturi: []
};
function cloneData(data) {
    return JSON.parse(JSON.stringify(data));
}

let state = cloneData(emptyData);

const els = {
    pacientiCount: document.getElementById("pacientiCount"),
    programariCount: document.getElementById("programariCount"),
    internariCount: document.getElementById("internariCount"),
    totalFacturi: document.getElementById("totalFacturi"),
    pacientiFiltered: document.getElementById("pacientiFiltered"),
    pacientiList: document.getElementById("pacientiList"),
    programariList: document.getElementById("programariList"),
    mediciList: document.getElementById("mediciList"),
    facturiList: document.getElementById("facturiList"),
    diagnosticFilter: document.getElementById("diagnosticFilter"),
    sectieFilter: document.getElementById("sectieFilter"),
    dataSource: document.getElementById("dataSource"),
    reloadBtn: document.getElementById("reloadBtn"),
    exportBtn: document.getElementById("exportBtn")
};

function bani(valoare) {
    return `${Number(valoare || 0).toFixed(2)} lei`;
}

function pacientDupaCnp(cnp) {
    return state.pacienti.find((pacient) => pacient.cnp === cnp);
}

function medicDupaId(id) {
    return state.medici.find((medic) => Number(medic.id) === Number(id));
}

function item(html) {
    const el = document.createElement("article");
    el.className = "item";
    el.innerHTML = html;
    return el;
}

function completeazaSectii() {
    const sectii = [...new Set((state.internari || []).map((internare) => internare.sectie))].sort();
    const valoareCurenta = els.sectieFilter.value;
    els.sectieFilter.innerHTML = '<option value="">Toate sectiile</option>';
    for (const sectie of sectii) {
        const option = document.createElement("option");
        option.value = sectie;
        option.textContent = sectie;
        els.sectieFilter.appendChild(option);
    }
    els.sectieFilter.value = sectii.includes(valoareCurenta) ? valoareCurenta : "";
}

function renderMetrics() {
    const total = (state.facturi || []).reduce((sum, factura) => sum + Number(factura.total || 0), 0);
    els.pacientiCount.textContent = state.pacienti.length;
    els.programariCount.textContent = state.programari.length;
    els.internariCount.textContent = state.internari.length;
    els.totalFacturi.textContent = bani(total);
}

function renderPacienti() {
    const diagnostic = els.diagnosticFilter.value.trim().toLowerCase();
    const sectie = els.sectieFilter.value;
    const internariFiltrate = sectie ? state.internari.filter((internare) => internare.sectie === sectie) : state.internari;
    const cnpInternati = new Set(internariFiltrate.map((internare) => internare.cnpPacient));

    const pacienti = state.pacienti.filter((pacient) => {
        const diagnosticOk = pacient.diagnostic.toLowerCase().includes(diagnostic);
        const sectieOk = !sectie || cnpInternati.has(pacient.cnp);
        return diagnosticOk && sectieOk;
    });

    els.pacientiFiltered.textContent = `${pacienti.length} rezultate`;
    els.pacientiList.innerHTML = "";

    for (const pacient of pacienti) {
        const internare = state.internari.find((itemInternare) => itemInternare.cnpPacient === pacient.cnp);
        els.pacientiList.appendChild(item(`
            <div class="item-row">
                <div>
                    <div class="item-title">${pacient.nume}</div>
                    <div class="muted">${pacient.varsta} ani · ${pacient.diagnostic}</div>
                </div>
                <span class="pill ${pacient.internat ? "warning" : ""}">${pacient.internat ? "Internat" : "Extern"}</span>
            </div>
            <div class="muted">${internare ? `${internare.sectie}, ${internare.numarZile} zile, ${bani(internare.cost)}` : pacient.cnp}</div>
        `));
    }
}

function renderProgramari() {
    els.programariList.innerHTML = "";
    for (const programare of state.programari) {
        const pacient = pacientDupaCnp(programare.cnpPacient);
        const medic = medicDupaId(programare.idMedic);
        els.programariList.appendChild(item(`
            <div>
                <div class="item-title">${programare.data} · ${programare.ora}</div>
                <div class="muted">${pacient?.nume || programare.cnpPacient} cu ${medic?.nume || "medic necunoscut"}</div>
            </div>
            <span class="pill">${programare.status}</span>
        `));
    }
}

function renderMedici() {
    els.mediciList.innerHTML = "";
    for (const medic of state.medici) {
        els.mediciList.appendChild(item(`
            <div>
                <div class="item-title">${medic.nume}</div>
                <div class="muted">${medic.specializare}</div>
            </div>
            <span class="pill">${bani(medic.tarifConsultatie)}</span>
        `));
    }
}

function renderFacturi() {
    els.facturiList.innerHTML = "";
    for (const factura of state.facturi) {
        const pacient = pacientDupaCnp(factura.cnpPacient);
        els.facturiList.appendChild(item(`
            <div>
                <div class="item-title">Factura #${factura.id}</div>
                <div class="muted">${pacient?.nume || factura.cnpPacient} · reducere ${(Number(factura.reducere) * 100).toFixed(0)}%</div>
            </div>
            <span class="pill ${factura.emisa ? "" : "danger"}">${bani(factura.total)}</span>
        `));
    }
}

function render() {
    completeazaSectii();
    renderMetrics();
    renderPacienti();
    renderProgramari();
    renderMedici();
    renderFacturi();
}

async function incarcaDate() {
    try {
        const response = await fetch("../data/spital.json", { cache: "no-store" });
        if (!response.ok) {
            throw new Error("snapshot indisponibil");
        }
        state = await response.json();
        els.dataSource.textContent = "data/spital.json";
    } catch (error) {
        state = cloneData(emptyData);
        els.dataSource.textContent = "data/spital.json indisponibil";
    }
    render();
}

function exportDashboard() {
    const continut = JSON.stringify(state, null, 2);
    const blob = new Blob([continut], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "spital-dashboard.json";
    link.click();
    URL.revokeObjectURL(url);
}

els.diagnosticFilter.addEventListener("input", renderPacienti);
els.sectieFilter.addEventListener("change", renderPacienti);
els.reloadBtn.addEventListener("click", incarcaDate);
els.exportBtn.addEventListener("click", exportDashboard);

incarcaDate();
