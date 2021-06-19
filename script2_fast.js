let wasted = false
let unliked = 0
let operate = setInterval(function() {
  try {
    if (wasted) {
      wasted = false
      const currentY = window.pageYOffset
      window.scrollTo(0, currentY + 10000)
      return;
    }
    const likes = document.body.querySelectorAll(
      'a.like_btn.like._like.active'
    );
    if (!likes.length) {
      console.log(`scroll* * * * * * * * * * * * * * * * * * * * * * * * * * *`)
      wasted = true
      return;
    }
    likes[0].click();
    unliked += 1
    console.log(unliked)
  } catch (er) {
    console.log(`TC/ERROR-> ${er}`)
    console.log(`End. Total unliked: ${unliked}`)
    console.log(unliked)
    clearInterval(operate);
    return;
  }
}, 100);
