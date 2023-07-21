
import './index.css'
export default function Footer() {
    return (
        <div id='footer'>
            <div id='technologies'>
                <h1>Technologies</h1>
            </div>
            <div id='footer-images'>
                <a className='footer-link' href='https://developer.mozilla.org/en-US/docs/Web/HTML' target="_blank">
                    <img classname='footer-img' src='/images/html.png' href='https://developer.mozilla.org/en-US/docs/Web/HTML'/>
                </a>
                <a className='footer-link' href='https://developer.mozilla.org/en-US/docs/Web/JavaScript' target="_blank">
                    <img classname='footer-img' src='/images/js.png'/>
                </a>
                <a className='footer-link' href='https://nodejs.org/en/docs' target="_blank">
                    <img classname='footer-img' src='/images/node.png'/>
                </a>
                <a className='footer-link' href='https://react.dev/' target="_blank">
                    <img classname='footer-img' src='/images/react.png'/>
                </a>
                <a className='footer-link' href='https://sequelize.org/' target="_blank">
                    <img classname='footer-img' src='/images/sequelize.png'/>
                </a>
                <a className='footer-link' id='sqlite-link' href='https://www.sqlite.org/docs.html' target="_blank">
                    <img id='sqlite-img' src='/images/sqlite.png'/>
                </a>
            </div>
        </div>
    )
}
