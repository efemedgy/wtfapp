/**
 * @author Doğuşcan Namal
 * @version 22.12.2017
 */
import React, {Component} from 'React';
import "clicker.css";

class Clicker extends Component {
    render(){
        return(
            <div className="wtf">

            </div>
        )
    }
}

function load () {
    setInterval(function () {
        if (pressed) {
            let div = document.createElement("div")
            div.textContent = "WTF"
            div.classList.add("wtf")
            div.style.fontSize = (20 + Math.random() * 150 | 0) + "px"
            div.style.left = (Math.random() * (document.body.clientWidth - 100) | 0) + "px"
            div.style.color = "rgb(" + (Math.random() * 255 | 0) + "," + (Math.random() * 255 | 0) + "," + (Math.random() * 255 | 0) + ")"
            div.style.fontFamily = fonts[Math.random() * fonts.length | 0]
            if (Math.random() > 0.7) {
                div.style.textShadow = (1 + Math.random() * 20 | 0) + "px " + (1 + Math.random() * 20 | 0) + "px " + (1 + Math.random() * 20 | 0) + "px "
                    + "rgb(" + (Math.random() * 255 | 0) + "," + (Math.random() * 255 | 0) + "," + (Math.random() * 255 | 0) + ")"
            }
            div.style.transform = "rotate(" + (Math.random() * 360 | 0) + "deg)"
            document.querySelector(".main").append(div)
            document.querySelector("p").textContent = ++count
            let margin = 250
            let id = setInterval(function () {
                div.style.top = (++margin) + "px"
                if (margin === 600) {
                    div.remove()
                    clearInterval(id)
                }
            }, 1 + Math.random() * 9 | 0)
        }
    }, 100)
}