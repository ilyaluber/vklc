function xmlToJson(xml) {
	var obj = {};
	if (xml.nodeType == 1) {
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) {
		obj = xml.nodeValue;
	}
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
}
let blocked = false;
let noLikesLeft = false;
let unlikedCount = 0;
let unlikedLast = null;
// operator
let operate = setInterval(function() {
  if (blocked) {
    console.log(`Blocked. Total unliked: ${unlikedCount}`);
    clearInterval(operate);
    return;
  }
  const likes = document.body.querySelectorAll(
    'a.like_btn.like._like.active'
  );
  if (!likes.length) {
    if (noLikesLeft) {
      console.log(`No likes left. Total unliked: ${unlikedCount}`);
      clearInterval(operate);
      return;
    }
    console.log(`v v v v v v v v v v v v v v v`);
    noLikesLeft = true
    const currentY = window.pageYOffset;
    window.scrollTo(0, currentY + 12000);
    return;
  }
  noLikesLeft = false
  const item = xmlToJson(likes[0])
  if (unlikedLast) {
    const lastValue = unlikedLast?.['@attributes']?.onclick
    const curValue = item?.['@attributes']?.onclick
    if (lastValue && curValue) {
      if (lastValue === curValue) {
        console.log(`unliking was blocked!`)
        console.log(`previous: ${lastValue}`)
        console.log(`current: ${curValue}`)
        blocked = true
        return;
      }
    }
  }
  likes[0].click();
  unlikedCount += 1;
  unlikedLast = null;
  unlikedLast = item;
  console.log(`${unlikedCount}`)
}, 500);
