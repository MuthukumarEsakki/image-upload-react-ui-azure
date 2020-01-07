import React, {Component} from 'react';
import {withStyles} from "@material-ui/core/styles";
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import authorizationApi from "../apis";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import RefreshIcon from '@material-ui/icons/Refresh';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/InfoOutlined';

const styles = theme => ({
  card: {
    width: '80%',
    maxWidth: 450,
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: 'none',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: 48,
    textAlign: 'center',
      margin: '0 auto'
  },
  buttonRoot: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  rightIcon: {
      marginLeft: '1',
    },
  checkCircle: {
      color: '#81BC00',
      fontSize: '96px',
  },
  cancel: {
      color: '#E14504',
      fontSize: '96px',
  },
  link: {
      textDecoration: 'none',
      color: theme.palette.text.secondary
    },
});

const tip ="This modal is meant to serve as an example of how to access a service behind the UDAL gateway. Please view authorization.js for implementation details."


function Authorized(props) {
    const {name, email, hasData} = props;
    if (hasData){
        return <IsAuthorized name={name} email={email}/>;
    }
    else{
        return <NotAuthorized />;
    }
  }

function IsAuthorized(props){
    const { name, email} = props;
    return(
        <div >
               <Typography style={{fontSize: 24, fontFamily: 'HelveticaNeueW01-75Bold, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '16px auto '}}  component="h2" >
                     Udal Authorization Successful
                     <Tooltip title={tip} margin="10" placement="right-start">
                         <InfoIcon style={{marginLeft: 12}}/>
                      </Tooltip>
                </Typography>
               <Typography style={{marginBottom: 32, fontSize: 16}}>
                   {name} <br/>  {email}
                </Typography>
        </div>
    );
}

function NotAuthorized(){
    return(
          <div>
                <Typography style={{fontSize: 24, fontFamily: 'HelveticaNeueW01-75Bold, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '16px auto '}}  component="h2" >
                       UDAL Authorization Failed
                   <Tooltip title={tip} placement="right-start">
                         <InfoIcon style={{marginLeft: 12}}/>
                      </Tooltip>
                 </Typography>
             <Typography style={{marginBottom: 32, fontSize: 16}}>
                 You are currently not connected to the Gateway!<br/>
                 Visit<a className={styles.link} href="https://digitalfactory.web.boeing.com/docs/1.%20Getting%20Started/6.%20Development%20Environment%20Setup.md" target="_blank"
                           rel="noopener noreferrer"> GitLab Documentation </a> for details on how to associate to the gateway.
             </Typography>
           <Button variant="contained" color="primary" style={{borderRadius: 6, boxShadow: 'unset', padding: '12px 16px', fontFamily: 'HelveticaNeueW01-75Bold, sans-serif'}}>
                <RefreshIcon style={{marginRight: 6}}/>
                   REFRESH
            </Button>
      </div>);
 }

class UdalAuthModal extends React.Component {
     constructor(props) {
      super(props);
      this.state = {
          data: {},
          isLoaded: false,
          hasData: false
      };
   }

     componentDidMount() {
          authorizationApi.getAuth().then(response => {
              this.setState({data: {...response.data}});
              if(this.state.data.friendlyName !== undefined)
              {
                  this.setState({hasData: true});
                  this.setState({isLoaded: true})
              }
          }).catch(() =>{
              this.setState({isLoaded: true})
              console.error("An error was caught while trying to load authorization data")
          });
      };

      render() {
        const {classes, open, handleClose} = this.props;
            return (
              <Modal open={open} onClose={handleClose}>
                <Fade in={open} mountOnEnter unmountOnExit>
                  <Card className={classes.card}>
                    <CardContent style={{padding: 0}}>
                        <ListItemIcon>
                            {this.state.hasData ? <CheckCircleIcon className={classes.checkCircle}/> :
                                <CancelIcon className={classes.cancel}/>}
                        </ListItemIcon>
                          <div>
                            <Authorized hasData={this.state.hasData} name={this.state.data.friendlyName} email={this.state.data.email}> </Authorized>
                      </div>
                    </CardContent>
                  </Card>
                </Fade>
              </Modal>
           );
        }
     }

export default withStyles(styles)(UdalAuthModal);