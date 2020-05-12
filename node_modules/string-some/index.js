"use strict";

function some(str, callback) {
	return Array.prototype.some.call(str, callback);
}

module.exports = some;
