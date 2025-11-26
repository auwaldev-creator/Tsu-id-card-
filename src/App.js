import React, { useState, useRef } from "react";
import IDCardPreview from "./IDCardPreview";
import SignaturePad from "./SignaturePad";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function App() {
  const [data, setData] = useState({
    schoolName: "Taraba State University",
    tagline: "Harnessing Nature's Gift",
    fullName: "Auwal Bashar",
    matric: "TSU/FS/PL/24/1076",
    department: "Political Science & International Relations",
    dob: "01/01/2004",
    blood: "O+",
    photoData: null,
    signatureData: null,
    logoUrl: "/tsu-logo.png"
  });

  const frontRef = useRef(null);
  const backRef = useRef(null);
  const fileRef = useRef(null);
  const logoRef = useRef(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  }

  function handlePhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setData(prev => ({ ...prev, photoData: reader.result }));
    reader.readAsDataURL(file);
  }

  function handleLogo(e){
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = () => setData(prev=>({ ...prev, logoUrl: reader.result }));
    reader.readAsDataURL(file);
  }

  function handleSignature(dataUrl){
    setData(prev => ({ ...prev, signatureData: dataUrl }));
  }

  async function exportPDF() {
    try {
      // We render front and back separately and add as 2 PDF pages.
      const pdf = new jsPDF({
        unit: "pt",
        format: "a4",
        orientation: "portrait"
      });

      // capture front
      const frontEl = document.getElementById("id-card-front");
      const backEl = document.getElementById("id-card-back");

      // render front to canvas
      const canvasFront = await html2canvas(frontEl, { scale: 3, useCORS: true, backgroundColor: "#ffffff" });
      const imgDataFront = canvasFront.toDataURL("image/png");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      // calculate target size so content fits well (leave margins)
      const margin = 40;
      const imgW = pageWidth - margin * 2;
      const imgH = (canvasFront.height / canvasFront.width) * imgW;

      pdf.addImage(imgDataFront, "PNG", margin, margin, imgW, imgH);

      // add new page for back
      pdf.addPage();

      const canvasBack = await html2canvas(backEl, { scale: 3, useCORS: true, backgroundColor: "#ffffff" });
      const imgDataBack = canvasBack.toDataURL("image/png");
      const imgW2 = pageWidth - margin * 2;
      const imgH2 = (canvasBack.height / canvasBack.width) * imgW2;
      pdf.addImage(imgDataBack, "PNG", margin, margin, imgW2, imgH2);

      pdf.save(`${data.matric || "id-card"}.pdf`);
    } catch (err) {
      console.error("Export error", err);
      alert("Error exporting PDF. Try again.");
    }
  }

  return (
    <div className="container">
      <div className="form">
        <h2>TSU Student ID Card Generator</h2>

        <div className="field">
          <label className="label">Full name</label>
          <input className="input" name="fullName" value={data.fullName} onChange={handleChange} />
        </div>

        <div className="field">
          <label className="label">Matric / ID</label>
          <input className="input" name="matric" value={data.matric} onChange={handleChange} />
        </div>

        <div className="field">
          <label className="label">Department</label>
          <input className="input" name="department" value={data.department} onChange={handleChange} />
        </div>

        <div className="field">
          <label className="label">Date of birth</label>
          <input className="input" name="dob" value={data.dob} onChange={handleChange} />
        </div>

        <div className="field">
          <label className="label">Blood group</label>
          <input className="input" name="blood" value={data.blood} onChange={handleChange} />
        </div>

        <div className="field">
          <label className="label">Upload passport photo</label>
          <input type="file" accept="image/*" onChange={handlePhoto} />
        </div>

        <div className="field">
          <label className="label">Upload school logo (optional)</label>
          <input type="file" accept="image/*" onChange={handleLogo} />
          <div className="small-muted">If you don't upload, the app will attempt to use /tsu-logo.png from public folder.</div>
        </div>

        <div className="field">
          <label className="label">Draw signature (finger or mouse)</label>
          <SignaturePad width={300} height={80} onChange={handleSignature} />
        </div>

        <div className="controls">
          <button className="btn" onClick={exportPDF}>Download front+back PDF</button>
        </div>
      </div>

      <div className="previewArea">
        <div className="previewTitle">Preview (front)</div>
        <div className="previewWrap">
          <div ref={frontRef}>
            <IDCardPreview data={{
              schoolName: data.schoolName,
              tagline: data.tagline,
              fullName: data.fullName,
              matric: data.matric,
              department: data.department,
              dob: data.dob,
              blood: data.blood,
              photoData: data.photoData,
              signatureData: data.signatureData,
              logoUrl: data.logoUrl
            }} side="front" />
          </div>
        </div>

        <div style={{height:12}}></div>

        <div className="previewTitle">Preview (back)</div>
        <div className="previewWrap">
          <div ref={backRef}>
            <IDCardPreview data={{
              schoolName: data.schoolName,
              tagline: data.tagline,
              signatureData: data.signatureData,
              logoUrl: data.logoUrl
            }} side="back" />
          </div>
        </div>
      </div>
    </div>
  );
                   }
