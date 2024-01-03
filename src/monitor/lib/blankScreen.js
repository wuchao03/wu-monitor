import tracker from "../utils/tracker"
import onload from "../utils/onload"

export function blankScreen() {
  let wrapperElements = ["html", "body", "#container", ".content"]
  let emptyPoints = 0
  function getSelector(element) {
    const { id, className, nodeName } = element
    if (id) {
      return "#" + id
    } else if (className) {
      // 过滤空白符 + 拼接
      return (
        "." +
        className
          .split(" ")
          .filter((item) => !!item)
          .join(".")
      )
    } else {
      return nodeName.toLowerCase()
    }
  }
  function isWrapper(element) {
    let selector = getSelector(element)
    if (wrapperElements.indexOf(selector) !== -1) {
      emptyPoints++
    }
  }
  // 刚开始页面内容为空，等页面渲染完成，再去做判断
  onload(function () {
    let xElements, yElements
    for (let i = 0; i < 9; i++) {
      xElements = document.elementsFromPoint(
        (window.innerWidth * i) / 10,
        window.innerHeight / 2
      )
      yElements = document.elementsFromPoint(
        window.innerWidth / 2,
        (window.innerHeight * i) / 10
      )
      isWrapper(xElements[0])
      isWrapper(yElements[0])
    }
    // 白屏
    if (emptyPoints >= 0) {
      const centerElements = document.elementsFromPoint(
        window.innerWidth / 2,
        window.innerHeight / 2
      )
      console.log("emptyPoints++++++++++++++", getSelector(centerElements[0]))
      tracker.send({
        kind: "stability",
        type: "blank",
        emptyPoints: emptyPoints + "",
        screen: window.screen.width + "X" + window.screen.height,
        viewPoint: window.innerWidth + "X" + window.innerHeight,
        selector: getSelector(centerElements[0]),
      })
    }
  })
}
//screen.width  屏幕的宽度   screen.height 屏幕的高度
//window.innerWidth 去除工具条与滚动条的窗口宽度 window.innerHeight 去除工具条与滚动条的窗口高度