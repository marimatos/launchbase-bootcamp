module.exports = {
  age: function(timestamp) {
    const today = new Date();
    const birthDate = new Date(timestamp);

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 ||
      month == 0 &&
      today.getDate() <= birthDate.getDate) {
        age = age - 1;
      }

      return age;
  },
  date: function(timestamp){
    const date = new Date(timestamp)
    
    const year = date.getUTCFullYear()
    const month = `0${date.getUTCMonth() + 1}`.slice(-2)
    const day = `0${date.getUTCDate()}`.slice(-2)

    return {
      day,
      month,
      year,
      birthDay: `${day}/${month}`,
      iso: `${year}-${month}-${day}`
    }
  },
  graduation: function graduation(value){
    if (value == 'hign-school') {
      return "Ensino Médio Completo"
    } else if (value == 'bachelor') {
      return "Superior Completo"
    } else if (value == 'master') {
      return "Mestrado"
    } else if (value == 'doctorate') {
      return "Doutorado"
    }
  },
  degree: function degree(value){
    if (value == '5') {
      return "5º ano do fundamental"
    } else if (value == '6') {
      return "6º ano do fundamental"
    } else if (value == '7') {
      return "7º ano do fundamental"
    } else if (value == '8') {
      return "8º ano do fundamental"
    } else if (value == '9') {
      return "9º ano do fundamental"
    } else if (value == '1') {
      return "1º ano do ensino médio"
    } else if (value == '2') {
      return "2º ano do ensino médio"
    } else if (value == '3') {
      return "3º ano do ensino médio"
    }
  }
}