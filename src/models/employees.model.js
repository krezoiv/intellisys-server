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
    idWorkPosition,
    idMunicipality,
    addressReference,
    BACaccount,
    BAMaccount,
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
      idWorkPosition,
      idMunicipality,
      addressReference,
      BACaccount,
      BAMaccount,
    });
  }
}

export default EmployeeModel;
