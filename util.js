const parseJson = (jsonRaw, jsonError) => {
    try {
        return JSON.parse(jsonRaw);
    } catch(exception) {
        return jsonError;
    }
}

export default parseJson;