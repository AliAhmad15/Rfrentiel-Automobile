import dayjs from 'dayjs';
import _ from 'lodash';

export default {
    filesFormatter(arr) {
        if (!arr || !arr.length) return [];
        return arr.map((item) => item);
    },
    imageFormatter(arr) {
        if (!arr || !arr.length) return []
        return arr.map(item => ({
            publicUrl: item.publicUrl || ''
        }))
    },
    oneImageFormatter(arr) {
        if (!arr || !arr.length) return ''
        return arr[0].publicUrl || ''
    },
    dateFormatter(date) {
        if (!date) return ''
        return dayjs(date).format('YYYY-MM-DD')
    },
    dateTimeFormatter(date) {
        if (!date) return ''
        return dayjs(date).format('YYYY-MM-DD HH:mm')
    },
    booleanFormatter(val) {
        return val ? 'Yes' : 'No'
    },
    dataGridEditFormatter(obj) {
        return _.transform(obj, (result, value, key) => {
            if (_.isArray(value)) {
                result[key] = _.map(value, 'id');
            } else if (_.isObject(value)) {
                result[key] = value.id;
            } else {
                result[key] = value;
            }
        });
    },

        brandsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.name)
        },
        brandsOneListFormatter(val) {
            if (!val) return ''
            return val.name
        },
        brandsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.name}
            });
        },
        brandsOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.name, id: val.id}
        },

        generationsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.name)
        },
        generationsOneListFormatter(val) {
            if (!val) return ''
            return val.name
        },
        generationsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.name}
            });
        },
        generationsOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.name, id: val.id}
        },

        imagesManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.tag)
        },
        imagesOneListFormatter(val) {
            if (!val) return ''
            return val.tag
        },
        imagesManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.tag}
            });
        },
        imagesOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.tag, id: val.id}
        },

        modelsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.name)
        },
        modelsOneListFormatter(val) {
            if (!val) return ''
            return val.name
        },
        modelsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.name}
            });
        },
        modelsOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.name, id: val.id}
        },

}
