import React from "react";

/**
 * IDCardPreview displays front or back depending on `side` prop.
 * data: { schoolName, fullName, matric, department, dob, blood, photoData, signatureData, logoUrl }
 */
export default function IDCardPreview({ data, side = "front" }) {
  const {
    schoolName = "Taraba State University",
    tagline = "Harnessing Nature's Gift",
    fullName = "Full Name",
    matric = "TSU/FS/PL/24/1076",
    department = "Department",
    dob = "01/01/2004",
    blood = "O+",
    photoData,
    signatureData,
    logoUrl = "/tsu-logo.png"
  } = data;

  if (side === "back") {
    return (
      <div className="id-card id-card-back" id="id-card-back">
        <div className="back-header">
          <div className="logoSmall">
            <img src={logoUrl} alt="logo" />
          </div>
          <div>
            <div className="back-title">{schoolName}</div>
            <div className="back-tag">{tagline}</div>
          </div>
        </div>

        <div className="back-body">
          <h4>Emergency / Contact</h4>
          <p><strong>Address:</strong> Taraba State University, Jalingo</p>
          <p><strong>Phone:</strong> 0700 000 0000</p>
          <hr />
          <h4>Notes</h4>
          <p>This ID is the property of the university and must be returned when requested.</p>
          <div className="back-sign">
            <div className="back-sign-box">{signatureData ? <img src={signatureData} alt="sign" /> : <small>Signature</small>}</div>
            <div className="back-dept">HOD / Registry</div>
          </div>
        </div>
        <div className="back-footer">TSU • {schoolName}</div>
      </div>
    );
  }

  // front
  return (
    <div className="id-card id-card-front" id="id-card-front">
      <div className="card-top">
        <div className="logoWrap">
          <img src={logoUrl} alt="logo" />
        </div>
        <div className="schoolName">
          <div className="schoolName-main">{schoolName}</div>
          <div className="school-tag">{tagline}</div>
        </div>
      </div>

      <div className="card-body">
        <div className="photoWrap">
          <div className="photoFrame">{photoData ? <img src={photoData} alt="photo" /> : <div className="photoPlaceholder">Photo</div>}</div>
        </div>

        <div className="infoWrap">
          <div className="name">{fullName}</div>
          <div className="matric">{matric}</div>
          <div className="dept">{department}</div>
          <div className="meta">
            <div><strong>DOB: </strong>{dob}</div>
            <div><strong>Blood: </strong>{blood}</div>
          </div>
        </div>
      </div>

      <div className="card-bottom">
        <div className="sigBox">{signatureData ? <img src={signatureData} alt="signature" /> : <small>Signature</small>}</div>
        <div className="footerText">{schoolName} • Student ID</div>
      </div>
    </div>
  );
}
