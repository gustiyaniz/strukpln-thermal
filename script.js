let selectedFile = null

document
.getElementById('imageInput')
.addEventListener('change', function(e){

  selectedFile = e.target.files[0]

  if(selectedFile){

    document
    .getElementById('preview')
    .src =
    URL.createObjectURL(selectedFile)

  }

})

async function scanOCR(){

  if(!selectedFile){
    alert('Upload screenshot dulu')
    return
  }

  const result =
  await Tesseract.recognize(
    selectedFile,
    'eng'
  )

  const text = result.data.text

  console.log(text)

  // TOKEN
  const token =
  text.match(/\d{20}/)

  if(token){

    document
    .getElementById('token')
    .value =
    token[0]
    .replace(/(.{4})/g,'$1 ')
  }

  // METER
  const meter =
  text.match(/Nomor Meter\s+(\d+)/i)

  if(meter){

    document
    .getElementById('meter')
    .value =
    meter[1]

  }

  // IDPEL
  const idpel =
  text.match(/Nomor Pelanggan\s+(\d+)/i)

  if(idpel){

    document
    .getElementById('idpel')
    .value =
    idpel[1]

  }

  // NAMA
  const nama =
  text.match(/Nama\s+([A-Z]+)/i)

  if(nama){

    document
    .getElementById('nama')
    .value =
    nama[1]

  }

  // TARIF
  const tarif =
  text.match(/R\d\s?\/\s?\d+\s?VA/i)

  if(tarif){

    document
    .getElementById('tarif')
    .value =
    tarif[0]

  }

  // KWH
  const kwh =
  text.match(/([\d\.]+)\s?kWh/i)

  if(kwh){

    document
    .getElementById('kwh')
    .value =
    kwh[1] + ' kWh'

  }

  // TOTAL
  const total =
  text.match(/Rp([\d\.]+)/i)

  if(total){

    document
    .getElementById('nominal')
    .value =
    'Rp ' + total[1]

    document
    .getElementById('total')
    .value =
    'Rp ' + total[1]

  }

  // ADMIN
  document
  .getElementById('admin')
  .value =
  'Rp 1.400'

  alert('OCR berhasil')

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

  document
  .getElementById('rToken')
  .innerHTML =
  document.getElementById('token')
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
  now.toLocaleDateString('id-ID')

  document
  .getElementById('waktu')
  .innerText =
  now.toLocaleTimeString('id-ID')

  window.print()

}