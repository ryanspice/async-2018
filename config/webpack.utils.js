
/**
 * [recursiveIssuer description]
 * @param  {[type]} m [description]
 * @return {[type]}   [description]
 */

function recursiveIssuer(m) {
	if (m.issuer) {
		return recursiveIssuer(m.issuer);
	} else if (m.name) {
		return m.name;
	} else {
		return false;
	}
}

module.exports = {
		recursiveIssuer
}
