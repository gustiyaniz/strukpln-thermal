pdfjsLib.GlobalWorkerOptions.workerSrc =
'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'

let selectedFile = null

document
.getElementById('pdfInput')
.addEventListener('change', function(e){

selectedFile = e.target.files[0]

if(selectedFile){

document
.getElementById('preview')
.style.display = 'block'

document
.getElementById('preview')
.innerHTML =
`
<div style="
padding:20px;
background:#f3f4f6;
border-radius:16px;
text-align:center;
font-weight:bold;
">
PDF Dipilih:
<br><br>
${selectedFile.name}
</div>
`

}

})

async function scanOCR(){

if(!selectedFile){

alert('Upload PDF Shopee terlebih dahulu')
return

}

try{

const reader = new FileReader()

reader.onload = async function(){

const typedarray =
new Uint8Array(this.result)

const pdf =
await pdfjsLib
.getDocument(typedarray)
.promise

let fullText = ''

for(let i = 1; i <= pdf.numPages; i++){

const page =
await pdf.getPage(i)

const content =
await page.getTextContent()

const strings =
content.items.map(
item => item.str
)

fullText +=
strings.join(' ') + ' '

}

console.log(fullText)


// ====================
// TOKEN PLN
// ====================

const token =
fullText.match(/\d{20}/)

if(token){

document
.getElementById('token')
.value =
token[0]
.replace(/(.{4})/g,'$1 ')
.trim()

}


// ====================
// NOMOR METER
// ====================

const meter =
fullText.match(
/Nomor Meter\s+(\d+)/i
)

if(meter){

document
.getElementById('meter')
.value =
meter[1]

}


// ====================
// ID PELANGGAN
// ====================

const idpel =
fullText.match(
/Nomor Pelanggan\s+(\d+)/i
)

if(idpel){

document
.getElementById('idpel')
.value =
idpel[1]

}


// ====================
// NAMA
// ====================

const nama =
fullText.match(
/Nama\s+([A-Z]+)\s+Tarif/i
)

if(nama){

document
.getElementById('nama')
.value =
nama[1].trim()

}


// ====================
// TARIF DAYA
// ====================

const tarif =
fullText.match(
/R\d\s?\/\s?\d+\s?VA/i
)

if(tarif){

document
.getElementById('tarif')
.value =
tarif[0]

}


// ====================
// JUMLAH KWH
// ====================

const kwh =
fullText.match(
/Jumlah\s?KwH\s?([\d\.]+)\s?kWh/i
)

if(kwh){

document
.getElementById('kwh')
.value =
kwh[1] + ' kWh'

}


// ====================
// NOMINAL TOKEN
// ====================

const nominal =
fullText.match(
/Rp\s?Stroom\/Token\s?Rp\.?([\d\.]+)/i
)

if(nominal){

document
.getElementById('nominal')
.value =
'Rp ' + nominal[1]

}


// ====================
// ADMIN
// ====================

const admin =
fullText.match(
/Biaya Admin\s+Rp([\d\.]+)/i
)

if(admin){

document
.getElementById('admin')
.value =
'Rp ' + admin[1]

}


// ====================
// TOTAL
// ====================

const total =
fullText.match(
/Total\s?tagihan\s?Rp\.?([\d\.]+)/i
)

if(total){

document
.getElementById('total')
.value =
'Rp ' + total[1]

}

alert('PDF berhasil diparsing')

}

reader.readAsArrayBuffer(selectedFile)

}catch(err){

console.error(err)

alert('Gagal membaca PDF')

}

}



function printReceipt(){

document
.getElementById('rToko')
.innerText =
document.getElementById('toko').value

document
.getElementById('rAlamat')
.innerText =
document.getElementById('alamat').value

document
.getElementById('rIdpel')
.innerText =
document.getElementById('idpel').value

document
.getElementById('rMeter')
.innerText =
document.getElementById('meter').value

document
.getElementById('rNama')
.innerText =
document.getElementById('nama').value

document
.getElementById('rTarif')
.innerText =
document.getElementById('tarif').value

document
.getElementById('rKwh')
.innerText =
document.getElementById('kwh').value


// TOKEN BESAR
document
.getElementById('rToken')
.innerHTML =
document
.getElementById('token')
.value
.replace(/(.{14})/g,'$1<br>')


document
.getElementById('rNominal')
.innerText =
document.getElementById('nominal').value

document
.getElementById('rAdmin')
.innerText =
document.getElementById('admin').value

document
.getElementById('rTotal')
.innerText =
document.getElementById('total').value


const now = new Date()

document
.getElementById('tanggal')
.innerText =
now.toLocaleDateString(
'id-ID',
{
day:'2-digit',
month:'short',
year:'numeric'
}
)

document
.getElementById('waktu')
.innerText =
now.toLocaleTimeString(
'id-ID',
{
hour:'2-digit',
minute:'2-digit'
}
)

window.print()

}
