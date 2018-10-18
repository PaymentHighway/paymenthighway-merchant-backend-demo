import { isResponse, isSuccess} from './phapi';

export const parseJson = (jsonRaw, jsonError) => {
    try {
        return JSON.parse(jsonRaw);
    } catch(exception) {
        return jsonError;
    }
}

export const buildResponse = (phResponse, ...objs) => {

    if (isResponse(phResponse)) {
      var result = { result: phResponse.result };   
      if (isSuccess(phResponse)) {
        for (var obj of objs) {
          result = Object.assign(result, obj)
        }
      }
      return result;
    }

    return {
      result: {
        code: 999,
        message: "Unknown error!!!"
      }
    }
}