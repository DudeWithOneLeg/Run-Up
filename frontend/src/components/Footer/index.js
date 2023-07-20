
import './index.css'
export default function Footer() {
    return (
        <div id='footer'>
            <div id='technologies'>
                <h1>Technologies</h1>
            </div>
            <div id='footer-images'>
                <a href='https://developer.mozilla.org/en-US/docs/Web/HTML' target="_blank">
                    <img src='/images/html.png' href='https://developer.mozilla.org/en-US/docs/Web/HTML'/>
                </a>
                <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript' target="_blank">
                    <img src='/images/js.png'/>
                </a>
                <a href='https://nodejs.org/en/docs' target="_blank">
                    <img src='/images/node.png'/>
                </a>
                <a href='https://react.dev/' target="_blank">
                    <img src='/images/react.png'/>
                </a>
                <a href='https://sequelize.org/' target="_blank">
                    <img src='/images/sequelize.png'/>
                </a>
            </div>
        </div>
    )
}
