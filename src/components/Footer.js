import logo  from '../assets/img/logo.svg'

const Footer = () => {
  return (
 
        <div className='d-flex justify-content-around footer'>
            <div className="position-relative mt-3">
                <img 
                    src={logo}             
                    style={{width: "200px", height:"100px"}}              
                />
                <pre className='copyright' style={{fontSize: "xx-small"}} >
                    Copyright &copy;2022 AElf Academy.<br/>Sheng Team for LegendX Hackathon
                </pre>
            </div>
            
            <div className='d-flex flex-column'>
                <a href="" className='mt-3 footer-link'>Developer Tools</a>
                <a href="" className='mt-3 footer-link'>Aelf Discord</a>
                <a href="" className='mt-3 footer-link'>Aelf Boilerplate</a>
            </div>
        
            <div className='d-flex flex-column'>
                <a href="" className='mt-3 footer-link'>Aelf Developer Center</a>
                <a href="" className='mt-3 footer-link'>Aelf Academy Discord</a>
                <a href="" className='mt-3 footer-link'>AelfBoilerplate Documentation</a>
               
            </div>
      
        </div>

  )
}

export default Footer
