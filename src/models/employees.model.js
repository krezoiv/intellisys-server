class EmployeeModel {
  constructor({
    idEmployee,
    code,
    firstName,
    secondName,
    firstLastName,
    secondLastName,
    hireDate,
    hireEndDate,
    idCampus,
    idStatus,
    idWorkposition,
    idMunicipality,
    addressReference,
    BACaccount,
    BAMaccount,
    dpi
  }) {
    Object.assign(this, {
      idEmployee,
      code,
      firstName,
      secondName,
      firstLastName,
      secondLastName,
      hireDate,
      hireEndDate,
      idCampus,
      idStatus,
      idWorkposition,
      idMunicipality,
      addressReference,
      BACaccount,
      BAMaccount,
      dpi
    });
  }
}

export default EmployeeModel;
