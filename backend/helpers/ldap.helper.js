const ActiveDirectory = require('activedirectory')

module.exports = {
  config: async (username, password) => {
    const config = {
      url: process.env.LDAP_URL,
      baseDN: process.env.LDAP_DN,
      username: username + process.env.LDAP_MAIL_ADRESS,
      password: password
    }
    const ad = new ActiveDirectory(config)
    return ad
  }
}
