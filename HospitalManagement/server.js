const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = process.env.PORT || 8080;
const ROOT_DIR = __dirname;
const DATA_DIR = path.join(ROOT_DIR, 'data');
const WEB_DIR = path.join(ROOT_DIR, 'web');

const files = {
  users: 'users.json',
  pacienti: 'pacienti.json',
  medici: 'medici.json',
  programari: 'programari.json',
  internari: 'internari.json',
  facturi: 'facturi.json',
  istoric: 'istoric_medical.json',
  retete: 'retete.json',
  intrari: 'intrari_spital.json',
  medicamente: 'medicamente.json',
  achizitii: 'achizitii_medicamente.json',
  statistici: 'statistici.json',
  raport: 'raport_spital.json'
};

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.ico': 'image/x-icon'
};

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload, null, 2));
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJson(fileName, fallback) {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, fileName);
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2), 'utf8');
      return fallback;
    }
    const content = fs.readFileSync(filePath, 'utf8').trim();
    return content ? JSON.parse(content) : fallback;
  } catch (error) {
    console.error(`Eroare la citirea ${fileName}:`, error.message);
    return fallback;
  }
}

function writeJson(fileName, value) {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, fileName);
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2), 'utf8');
}

function normalizeArray(value) {
  return Array.isArray(value) ? value : [];
}

function calcDerivedData(data) {
  const pacienti = normalizeArray(data.pacienti);
  const medici = normalizeArray(data.medici);
  const programari = normalizeArray(data.programari);
  const facturi = normalizeArray(data.facturi);

  const venitTotal = facturi.reduce((sum, factura) => sum + Number(factura.total || 0), 0);
  const diagnosticCounts = {};
  pacienti.forEach((pacient) => {
    const diagnostic = pacient.diagnostic || 'N/A';
    diagnosticCounts[diagnostic] = (diagnosticCounts[diagnostic] || 0) + 1;
  });
  const diagnosticFrecvent = Object.entries(diagnosticCounts)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  const statistici = {
    totalPacienti: pacienti.length,
    pacientiInternati: pacienti.filter((pacient) => pacient.internat).length,
    totalMedici: medici.length,
    programariActive: programari.filter((programare) => programare.status !== 'anulata' && programare.status !== 'finalizata').length,
    totalFacturi: facturi.length,
    venitTotal,
    diagnosticFrecvent
  };

  data.statistici = statistici;
  data.raport = {
    ...statistici,
    pacientiCriticiUrgenti: pacienti.filter((pacient) => pacient.prioritate === 'urgenta' || pacient.prioritate === 'critica').length
  };
  return data;
}

function loadAllData() {
  return {
    users: readJson(files.users, []),
    pacienti: readJson(files.pacienti, []),
    medici: readJson(files.medici, []),
    programari: readJson(files.programari, []),
    internari: readJson(files.internari, []),
    facturi: readJson(files.facturi, []),
    istoric: readJson(files.istoric, []),
    retete: readJson(files.retete, []),
    intrari: readJson(files.intrari, []),
    medicamente: readJson(files.medicamente, []),
    achizitii: readJson(files.achizitii, []),
    statistici: readJson(files.statistici, {}),
    raport: readJson(files.raport, {})
  };
}

function saveAllData(input) {
  const data = calcDerivedData(input || {});
  Object.entries(files).forEach(([key, fileName]) => {
    const fallback = key === 'statistici' || key === 'raport' ? {} : [];
    writeJson(fileName, data[key] ?? fallback);
  });
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 10 * 1024 * 1024) {
        req.destroy();
        reject(new Error('Date prea mari'));
      }
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

function serveStatic(req, res, pathname) {
  let safePath = decodeURIComponent(pathname);
  if (safePath === '/') safePath = '/login.html';
  const filePath = path.normalize(path.join(WEB_DIR, safePath));

  if (!filePath.startsWith(WEB_DIR)) {
    res.writeHead(403);
    res.end('Acces interzis');
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Fisierul nu a fost gasit');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    res.end(content);
  });
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = requestUrl.pathname;

  if (req.method === 'GET' && pathname === '/api/health') {
    sendJson(res, 200, { ok: true, message: 'Serverul functioneaza.' });
    return;
  }

  if (req.method === 'GET' && pathname === '/api/data') {
    sendJson(res, 200, calcDerivedData(loadAllData()));
    return;
  }

  if (req.method === 'POST' && pathname === '/api/data') {
    try {
      const body = await readRequestBody(req);
      const data = body ? JSON.parse(body) : {};
      saveAllData(data);
      sendJson(res, 200, { ok: true, message: 'Datele au fost salvate in fisierele JSON.' });
    } catch (error) {
      console.error('Eroare la salvarea datelor:', error.message);
      sendJson(res, 500, { ok: false, message: 'Nu s-au putut salva datele in JSON.' });
    }
    return;
  }

  serveStatic(req, res, pathname);
});

server.listen(PORT, () => {
  console.log(`Server pornit: http://localhost:${PORT}`);
  console.log('Datele noi se salveaza automat in folderul data/*.json');
});
