import Left from "../../Components/left/left";
export default Signin;
import './Signin.css';
import { Link } from "react-router-dom";


function Signin(){
    return (    
            <>
            <Left/>
            <Form/>

            </>

    );
}


function Form(){

    return (
        <>
        <div className="right">
            <div className="title">
                <div className="signupheader">
                <span className="up">Sign In</span>
                </div> 
                <div className="signupcontent">
                <span id="signin">Dont have an accout yet? <Link to="/signup" className="green">Sign Up</Link></span>    
                </div>
               
                
                
            </div>
            <div className="signupform">
                <form>

                    
                    <input type="text" name="Username" id="username" placeholder="UserName or Email Address"/>
                    

                    <input type="Password" name="Password" id="password" placeholder="Password" />
                

                  <label htmlFor="privacy">
                    <input type="checkbox" name="privacy policy" id="privacy" />
                    <div>
                    <span className="labellight">Remember me</span>
                    </div>
                    </label>

                </form>
                    
            </div>
          <button><span className="signupbutton">Sign In</span></button>
        </div>
        
        </>
    );
}