export default class Validations {

    verifyIftypeInput(input) {
        return input.includes("@");
    }

    verifySizeInput(input) {
        if (input.length > 5 && input.length < 10) {
            return true;
        } else {
            return false
        }
    }

    verifyStartandEndInput(input) {
        if (input.startsWith(".") || input.startsWith('@') || input.endsWith('.') || input.endsWith('@')) {

            return false;
        } else {
            return true;
        }
    }
    
    validateDomain(input) {
        const r = /^([a-zA-Z0-9._\.])+\@(sacaba)+\.+(gob)+\.+(bo)+$/;

        if (!r.test(input)) {
            return false;
        } else {
            return true;
        }

    }

}