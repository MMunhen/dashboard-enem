
const API_BASE_URL = 'http://localhost:3000/api';

const sectionToEndpointMap = {
    'media-estado': 'media_estado',
    'media-municipio-rj': 'media_municipio_rj', 
    'media-sexo': 'media_sexo',
    'media-cor-raca': 'media_cor_raca',
    'media-tipo-escola': 'media_tipo_escola',
    'media-faixa-etaria': 'media_faixa_etaria',
    'participantes-nota': 'participantes_nota',
    'maior-nota-estado': 'maior_nota_estado',
    'media-regiao': 'media_regiao',
    'maior-media-disciplina-estado': 'maior_media_disciplina_estado',
    'media-disciplina-uf': 'media_disciplina_UF',
    'conteudos-mais-errados': 'conteudos_mais_errados'
};

let currentSection = 'overview';
let chartInstances = {};

function formatNumber(num) {
    if (typeof num !== 'number') return num;
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
    }).format(num);
}

function showLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.style.display = 'flex';
    }
}

function hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}


async function fetchApiData(endpoint) {
    try {
        console.log(`Fazendo requisição GET para: ${API_BASE_URL}/${endpoint}`);
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(`Dados recebidos de ${endpoint}:`, data);
        return data;
    } catch (error) {
        console.error(`Erro ao buscar dados de ${endpoint}:`, error);
        throw error;
    }
}


function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.dataset.section;
            showSection(section);
            
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function showSection(sectionName) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));
    
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionName;
        loadSectionData(sectionName);
    }
}


async function loadSectionData(sectionName) {
    const endpoint = sectionToEndpointMap[sectionName];
    if (!endpoint) return;
    
    try {
        showLoading();
        console.log(`Carregando dados para seção: ${sectionName}`);
        
        const data = await fetchApiData(endpoint);
        console.log(`Dados recebidos para ${sectionName}:`, data);
        
        if (data && data.length > 0) {
            await populateTable(sectionName, data);
            await createChart(sectionName, data);
        }
        
        hideLoading();
    } catch (error) {
        console.error(`Erro ao carregar dados da seção ${sectionName}:`, error);
        hideLoading();
    }
}


async function populateTable(sectionName, data) {
    const tbodyId = sectionName + '-tbody';
    const tbody = document.querySelector(`#${tbodyId}`);
    if (!tbody) {
        console.warn(`Tbody não encontrado para: ${tbodyId}`);
        return;
    }
    
    tbody.innerHTML = '';
    
    switch (sectionName) {
        case 'media-estado':
            populateMediaEstadoTable(tbody, data);
            break;
        case 'media-municipio-rj':
            populateMunicipioRJTable(tbody, data);
            break;
        case 'media-sexo':
            populateMediaSexoTable(tbody, data);
            break;
        case 'media-cor-raca':
            populateCorRacaTable(tbody, data);
            break;
        case 'media-tipo-escola':
            populateTipoEscolaTable(tbody, data);
            break;
        case 'media-faixa-etaria':
            populateFaixaEtariaTable(tbody, data);
            break;
        case 'participantes-nota':
            populateParticipantesNotaTable(tbody, data);
            break;
        case 'maior-nota-estado':
            populateMaiorNotaEstadoTable(tbody, data);
            break;
        case 'media-regiao':
            populateMediaRegiaoTable(tbody, data);
            break;
        case 'maior-media-disciplina-estado':
            populateMaiorMediaDisciplinaTable(tbody, data);
            break;
        case 'media-disciplina-uf':
            populateMediaDisciplinaUFTable(tbody, data);
            break;
        case 'conteudos-mais-errados':
            populateConteudosMaisErradosTable(tbody, data);
            break;
        default:
            populateGenericTable(tbody, data);
    }
}

function populateMediaEstadoTable(tbody, data) {
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.UF || 'N/A'}</td>
            <td>${formatNumber(item.MediaNota || 0)}</td>
        `;
        tbody.appendChild(row);
    });
}

function populateMunicipioRJTable(tbody, data) {
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.Municipio || 'N/A'}</td>
            <td>${formatNumber(item.MediaNota || 0)}</td>
        `;
        tbody.appendChild(row);
    });
}

function populateMediaSexoTable(tbody, data) {
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.Sexo || 'N/A'}</td>
            <td>${formatNumber(item.MediaGeral || 0)}</td>
            <td>${formatNumber(item.CienciasHumanas || 0)}</td>
            <td>${formatNumber(item.LinguagensECodigos || 0)}</td>
            <td>${formatNumber(item.Matematica || 0)}</td>
            <td>${formatNumber(item.CienciasDaNatureza || 0)}</td>
        `;
        tbody.appendChild(row);
    });
}

function populateCorRacaTable(tbody, data) {
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.CorRaca || 'N/A'}</td>
            <td>${formatNumber(item.MediaGeral || 0)}</td>
            <td>${formatNumber(item.CienciasHumanas || 0)}</td>
            <td>${formatNumber(item.LinguagensECodigos || 0)}</td>
            <td>${formatNumber(item.Matematica || 0)}</td>
            <td>${formatNumber(item.CienciasDaNatureza || 0)}</td>
        `;
        tbody.appendChild(row);
    });
}

function populateTipoEscolaTable(tbody, data) {
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.TipoEscola}</td>
            <td>${formatNumber(item.MediaGeral || 0)}</td>
            <td>${formatNumber(item.CienciasHumanas || 0)}</td>
            <td>${formatNumber(item.LinguagensECodigos || 0)}</td>
            <td>${formatNumber(item.Matematica || 0)}</td>
            <td>${formatNumber(item.CienciasDaNatureza || 0)}</td>
        `;
        tbody.appendChild(row);
    });
}

function populateFaixaEtariaTable(tbody, data) {
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.Faixa_Etaria || 'N/A'}</td>
            <td>${formatNumber(item.MediaGeral || 0)}</td>
            <td>${formatNumber(item.CienciasHumanas || 0)}</td>
            <td>${formatNumber(item.LinguagensECodigos || 0)}</td>
            <td>${formatNumber(item.Matematica || 0)}</td>
            <td>${formatNumber(item.CienciasDaNatureza || 0)}</td>
        `;
        tbody.appendChild(row);
    });
}

function populateParticipantesNotaTable(tbody, data) {
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.ParticipanteID || 'N/A'}</td>
            <td>${formatNumber(item.CienciasHumanas || 0)}</td>
            <td>${formatNumber(item.LinguagensECodigos || 0)}</td>
            <td>${formatNumber(item.Matematica || 0)}</td>
            <td>${formatNumber(item.CienciasDaNatureza || 0)}</td>
        `;
        tbody.appendChild(row);
    });
}

function populateMaiorNotaEstadoTable(tbody, data) {
    data.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}º</td>
            <td>${item.UF || 'N/A'}</td>
            <td>${formatNumber(item.CienciasHumanas || 0)}</td>
            <td>${formatNumber(item.LinguagensECodigos || 0)}</td>
            <td>${formatNumber(item.Matematica || 0)}</td>
            <td>${formatNumber(item.CienciasDaNatureza || 0)}</td>
            <td>${formatNumber(item.MINCienciasHumanas || 0)}</td>
            <td>${formatNumber(item.MINLinguagensECodigos || 0)}</td>
            <td>${formatNumber(item.MINMatematica || 0)}</td>
            <td>${formatNumber(item.MINCienciasDaNatureza || 0)}</td>
        `;
        tbody.appendChild(row);
    });
}

function populateMediaRegiaoTable(tbody, data) {
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.Regiao || 'N/A'}</td>
            <td>${formatNumber(item.MediaGeral || 0)}</td>
            <td>${formatNumber(item.CienciasHumanas || 0)}</td>
            <td>${formatNumber(item.LinguagensECodigos || 0)}</td>
            <td>${formatNumber(item.Matematica || 0)}</td>
            <td>${formatNumber(item.CienciasDaNatureza || 0)}</td>
        `;
        tbody.appendChild(row);
    });
}

function populateMaiorMediaDisciplinaTable(tbody, data) {
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.UF || 'N/A'}</td>
            <td>${item.Disciplina || 'N/A'}</td>
            <td>${formatNumber(item.MediaNota || 0)}</td>
        `;
        tbody.appendChild(row);
    });
}

function populateMediaDisciplinaUFTable(tbody, data) {
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.UF || 'N/A'}</td>
            <td>${formatNumber(item.CienciasHumanas || 0)}</td>
            <td>${formatNumber(item.LinguagensECodigos || 0)}</td>
            <td>${formatNumber(item.Matematica || 0)}</td>
            <td>${formatNumber(item.CienciasDaNatureza || 0)}</td>
            <td>${formatNumber(item.MediaGeral || 0)}</td>
        `;
        tbody.appendChild(row);
    });
}

function populateConteudosMaisErradosTable(tbody, data) {
    data.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}º</td>
            <td>${item.Conteudo || 'N/A'}</td>
            <td>${formatNumber(item.TaxaErroPercentual || 0)}%</td>
            <td>${formatNumber(item.TotalRespostas || 0)}</td>
            <td>${formatNumber(item.TotalErros || 0)}</td>
        `;
        tbody.appendChild(row);
    });
}

function populateGenericTable(tbody, data) {
    if (data.length === 0) return;
    
    const keys = Object.keys(data[0]);
    
    data.forEach(item => {
        const row = document.createElement('tr');
        keys.forEach(key => {
            const cell = document.createElement('td');
            const value = item[key];
            cell.textContent = typeof value === 'number' ? formatNumber(value) : (value || 'N/A');
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
}


async function createChart(sectionName, data) {
    const chartId = sectionName + '-chart';
    const canvas = document.getElementById(chartId);
    if (!canvas || typeof Chart === 'undefined') return;
    
    if (chartInstances[chartId]) {
        chartInstances[chartId].destroy();
    }
    
    switch (sectionName) {
        case 'media-estado':
            createMediaEstadoChart(canvas, data);
            break;
        case 'media-municipio-rj':
            createMunicipioRJChart(canvas, data);
            break;
        case 'media-sexo':
            createMediaSexoChart(canvas, data);
            break;
        case 'media-cor-raca':
            createCorRacaChart(canvas, data);
            break;
        case 'media-tipo-escola':
            createTipoEscolaChart(canvas, data);
            break;
        case 'media-faixa-etaria':
            createFaixaEtariaChart(canvas, data);
            break;
        case 'media-regiao':
            createMediaRegiaoChart(canvas, data);
            break;
        case 'conteudos-mais-errados':
            createConteudosMaisErradosChart(canvas, data);
            break;
    }
}

function createMediaEstadoChart(canvas, data) {
    chartInstances[canvas.id] = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: data.map(item => item.UF),
            datasets: [{
                label: 'Média por Estado',
                data: data.map(item => item.MediaNota || 0),
                backgroundColor: '#3b82f6',
                borderColor: '#2563eb',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Média'
                    }
                }
            }
        }
    });
}

function createMunicipioRJChart(canvas, data) {
    const sortedData = [...data].sort((a, b) => (b.MediaNota || 0) - (a.MediaNota || 0)).slice(0, 15);
    
    chartInstances[canvas.id] = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: sortedData.map(item => item.Municipio),
            datasets: [{
                label: 'Média por Município (RJ)',
                data: sortedData.map(item => item.MediaNota || 0),
                backgroundColor: '#10b981',
                borderColor: '#059669',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Média'
                    }
                }
            }
        }
    });
}

function createMediaSexoChart(canvas, data) {
    chartInstances[canvas.id] = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: data.map(item => item.Sexo),
            datasets: [{
                label: 'Média Geral',
                data: data.map(item => item.MediaGeral || 0),
                backgroundColor: '#ec4899',
                borderColor: '#db2777',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Média'
                    }
                }
            }
        }
    });
}

function createCorRacaChart(canvas, data) {
    chartInstances[canvas.id] = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: data.map(item => item.CorRaca),
            datasets: [{
                label: 'Média Geral',
                data: data.map(item => item.MediaGeral || 0),
                backgroundColor: '#8b5cf6',
                borderColor: '#7c3aed',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Média'
                    }
                }
            }
        }
    });
}

function createTipoEscolaChart(canvas, data) {
    const labels = data.map(item => {
        return item.TipoEscola;
    });
    
    chartInstances[canvas.id] = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Média Geral',
                data: data.map(item => item.MediaGeral || 0),
                backgroundColor: ['#f59e0b', '#10b981', '#6b7280'],
                borderColor: ['#d97706', '#059669', '#4b5563'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Média'
                    }
                }
            }
        }
    });
}

function createFaixaEtariaChart(canvas, data) {
    chartInstances[canvas.id] = new Chart(canvas, {
        type: 'line',
        data: {
            labels: data.map(item => item.Faixa_Etaria),
            datasets: [{
                label: 'Média por Idade',
                data: data.map(item => item.MediaGeral || 0),
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Média'
                    }
                }
            }
        }
    });
}

function createMediaRegiaoChart(canvas, data) {
    chartInstances[canvas.id] = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: data.map(item => item.Regiao),
            datasets: [{
                label: 'Média por Região',
                data: data.map(item => item.MediaGeral || 0),
                backgroundColor: '#8b5cf6',
                borderColor: '#7c3aed',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Média'
                    }
                }
            }
        }
    });
}

function createConteudosMaisErradosChart(canvas, data) {
    const sortedData = [...data].sort((a, b) => (b.TaxaErroPercentual || 0) - (a.TaxaErroPercentual || 0)).slice(0, 20);
    
    chartInstances[canvas.id] = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: sortedData.map(item => item.Conteudo?.substring(0, 30) + '...' || 'N/A'),
            datasets: [{
                label: 'Taxa de Erro (%)',
                data: sortedData.map(item => item.TaxaErroPercentual || 0),
                backgroundColor: '#ef4444',
                borderColor: '#dc2626',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Taxa de Erro (%)'
                    }
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando dashboard...');
    initializeNavigation();
    loadInitialData();
    showSection('overview');
});

async function loadInitialData() {
    try {
        showLoading();
        console.log('Carregando dados iniciais...');
        if (typeof Chart !== 'undefined') {
            Chart.defaults.responsive = true;
            Chart.defaults.maintainAspectRatio = false;
        }
        
        hideLoading();
        console.log('Dashboard inicializado com sucesso');
    } catch (error) {
        console.error('Erro ao carregar dados iniciais:', error);
        hideLoading();
    }
}

window.refreshChart = async function(chartId) {
    const sectionName = chartId.replace('-chart', '');
    await loadSectionData(sectionName);
};

window.refreshTable = async function(tableId) {
    const sectionName = tableId.replace('-table', '');
    await loadSectionData(sectionName);
};
