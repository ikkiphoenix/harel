import moment from 'moment';

class cMoment {
    getMoment(date) {
        return moment(date);
    }

    addDays(number) {
        return this.getMoment().add(parseInt(number),'days');
    }

    substractDays(number) {
        return this.getMoment().subtract(parseInt(number),'days');
    }
}

const customMoment = new cMoment();
export default customMoment;