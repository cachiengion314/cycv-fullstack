class Utility {
    constructor() {
        this.downloadImage = (imgUrlData, filename = 'untitled.png') => {
            var a = document.createElement('a');
            a.href = imgUrlData;
            a.download = filename;
            a.id = "download-link";
            document.body.appendChild(a);
            a.click();
            document.querySelector(`#download-link`).remove();
        }
        this.getPropsNameFrom = (obj) => {
            let iteratorData = Object.entries(obj);
            let propsName = [];
            // eslint-disable-next-line
            for (let [key, value] of iteratorData) {
                propsName.push(key);
            }
            return propsName;
        }
        this.countInvokeTime = (LOG_NAME = "countInvokeTime: ") => {
            console.count(LOG_NAME);
        }
        this.getPermutationArrOf = (STR = "abc") => {
            const permutate = (STR = "abc", lIndex = 0, STR_length = 3) => {
                if (lIndex === STR_length - 1) {
                    _allPermutionArr.push(STR);
                    return;
                }
                for (let i = lIndex; i < STR_length; ++i) {
                    STR = this.STR_Swap(STR, lIndex, i);
                    permutate(STR, lIndex + 1, STR_length);
                }
            }
            let _allPermutionArr = [];
            permutate(STR, 0, STR.length);
            return _allPermutionArr;
        }
        this.getRandomHash = () => {
            let STR_arr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
            let currentEpochTime = Date.now();
            let STR_currentEpochTime = `${currentEpochTime}`;
            let STR_currentEpochTime_arr = [...STR_currentEpochTime];
            for (let i = 0; i < STR_arr.length; ++i) {
                STR_currentEpochTime_arr[i] = STR_arr[STR_currentEpochTime_arr[i]];
            }
            STR_currentEpochTime_arr = this.shuffleAnArr(STR_currentEpochTime_arr);
            STR_currentEpochTime_arr[0] = "RH";
            STR_currentEpochTime = STR_currentEpochTime_arr.join("");
            return STR_currentEpochTime;
        }
        this.getRandomNumber = (min = 0, MAX_IS_EXCLUSIVE = 2) => {
            return Math.floor(Math.random() * (MAX_IS_EXCLUSIVE - min)) + min;
        }
        this.measureExecutingTime = (callbackThatNeedToMeasure) => {
            let startTimer = window.performance.now();
            callbackThatNeedToMeasure();
            let endTimer = window.performance.now();
            return endTimer - startTimer;
        }
        this.shuffleAnArr = (arr) => {
            let tempArr = [...arr];
            let rArr = [...arr];
            for (let i = 0; i < arr.length; ++i) {
                let rIndex = this.getRandomNumber(0, tempArr.length);
                rArr[i] = tempArr[rIndex];
                tempArr.splice(rIndex, 1);
            }
            return rArr;
        }
        this.STR_Swap = (STR = "abc", index1 = 0, index2 = 2) => {
            let origin = [];
            for (let value of STR) {
                origin.push(value);
            }
            let temp = origin[index1];
            origin[index1] = origin[index2];
            origin[index2] = temp;

            return origin.join("");
        }
        this.STR_InsertCharAt = (ORIGIN_STR, index, REPLACED_STR) => {
            return ORIGIN_STR.slice(0, index) + REPLACED_STR + ORIGIN_STR.slice(index + 1);
        }
        this.convertToNumber = (STR) => {
            for (let i = 0; i < STR.length; ++i) {
                if (isNaN(Number(STR[i]))) {
                    if (STR[i] === ".") continue;
                    let _metric = ``;
                    for (let j = i; j < STR.length; ++j) {
                        _metric += STR[j];
                    }
                    return { val: Number(STR.split(STR[i])[0]), metric: _metric };
                }
            }
            return STR;
        }
        this.convertToMetric = (val, metric) => {
            return `${val}${metric}`;
        }
        this.plus = (UNIT_A = "1px", UNIT_B = "2px") => {
            const valA = this.convertToNumber(UNIT_A).val;
            const metric = this.convertToNumber(UNIT_A).metric;
            const valB = this.convertToNumber(UNIT_B).val;
            return this.convertToMetric(valA + valB, metric);
        }
        this.minus = (UNIT_A = "1px", UNIT_B = "2px") => {
            const valA = this.convertToNumber(UNIT_A).val;
            const metric = this.convertToNumber(UNIT_A).metric;
            const valB = this.convertToNumber(UNIT_B).val;
            return this.convertToMetric(valA - valB, metric);
        }
        this.multiply = (UNIT = "2px", byNumber = 2) => {
            const { val, metric } = this.convertToNumber(UNIT);
            return this.convertToMetric(val * byNumber, metric);
        }
    }
    static setup() {
        return new Utility();
    }
}

export default Utility.setup();