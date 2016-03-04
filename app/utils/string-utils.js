export default {
	convertToArrayBufferView: function (str)
	{
		var bytes = new Uint8Array(str.length);
		for (var iii = 0; iii < str.length; iii++)
		{
			bytes[iii] = str.charCodeAt(iii);
		}

		return bytes;
	},

	convertFromArrayBufferView: function (buffer)
	{
		var str = "";
		for (var iii = 0; iii < buffer.byteLength; iii++)
		{
			str += String.fromCharCode(buffer[iii]);
		}

		return str;
	}
}
