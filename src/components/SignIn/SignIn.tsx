import * as React from 'react';

interface ISignInProps {
    onRouteChange:Function
    
}

interface ISignInState {
    signInName : string,
    signInPassword:string,
}

class SignIn extends React.Component<ISignInProps,ISignInState>{
    constructor(props:ISignInProps){
        super(props);
        this.state ={
            signInName:'',
            signInPassword:'',
        }
        
    }

    onSubmitSignIn = ()=>{
        fetch('http://localhost:3000/signin',{
            method:'post',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                name:this.state.signInName,
                password: this.state.signInPassword
            })
        }).then(response => response.json())
            .then(data => {
                if (data === 'success'){
                    this.props.onRouteChange('home');
                }
            });
    };

    onNameChange = (event) =>{
        this.setState({signInName: event.target.value});
    };

    onPasswordChange = (event)=>{
        this.setState({signInPassword: event.target.value});
    };

    render(){
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="name"/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password"/>
                            </div>
                        </fieldset>
                        <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" onClick={this.onSubmitSignIn} type="submit" value="Sign in"/>
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => this.props.onRouteChange('registers')} className="f6 link dim black db pointer">Register</p>
                        </div>
                    </div>
                </main>
            </article>

        );
    }

};

export default SignIn;