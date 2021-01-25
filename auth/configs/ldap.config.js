const ActiveDirectory = require('activedirectory')
const config = {
  url: process.env.LDAP_URL,
  baseDN: process.env.LDAP_DN,
  username: process.env.LDAP_USERNAME + process.env.LDAP_MAIL_ADRESS,
  password: process.env.LDAP_PASSWORD
}

const ad = new ActiveDirectory(config)

module.exports = ad
