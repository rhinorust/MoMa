var tools = {
    /**
     *  Check the current language en return the localization string
     *  @param {Object} oLocalizations - Localization strings object
     *  @param {Array} aData - Array of properties to loop into
     */
    getLocalization: function(oLocalizations, aData) {
        var currentLocale = currentLanguage;
        if (oLocalizations[currentLocale]) {
            var oTracduction = tools.isset(oLocalizations[currentLocale], aData);
            if (oTracduction) {
                return oTracduction;
            } else {
                var enTractiontion = tools.isset(oLocalizations["en"], aData);
                if (enTractiontion) {
                    return enTractiontion;
                } else {
                    return aData[0] + " " + aData[1];
                }
            }
        }
    },
    /**
     *  Check if the object prop exist en return it
     *  @param {Object} object - Objevt to look into
     *  @param {Array} props - Array of properties to loop into
     */
    isset: function(object, props) {
        // we will use the dump variable to iterate in the object
        var dump,
            propsLength = props.length - 1;
        // loop in the properties
        for (var x = 0; x < props.length; x++) {
            // first prop?
            if (x == 0) {
                // add the object to dump (object.props1)
                dump = object[props[x]];
                continue;
            }

            // Undefined? return false
            if (typeof dump == "undefined" || typeof dump[props[x]] == "undefined") {
                return false;
            } else {
                // move in the object level
                // object.props1.props2
                // object.props1.props2.props3
                dump = dump[props[x]];
                // return true, of even return the object back
                if (x == propsLength)
                    return dump;
            }
        }
    }
}