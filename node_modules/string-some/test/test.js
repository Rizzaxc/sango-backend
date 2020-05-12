"use strict";

const assert = require("chai").assert;
const some = require("../index");

describe("some", function(){
	it("should return true if the callback is true for a character", function(){
		assert.equal(true, some("abcde", function(ch){
			return ch === "c";
		}));

		assert.equal(true, some("abcdE", function(ch){
			return ch === ch.toUpperCase();
		}));

		assert.equal(true, some("abcde", isNaN));
	});

	it("should return false if the callback is not true for any character", function(){
		assert.equal(false, some("abcde", function(ch){
			return ch === "f";
		}));

		assert.equal(false, some("abcde", function(ch){
			return ch === ch.toUpperCase();;
		}));

		assert.equal(false, some("123", isNaN));
	});
});
