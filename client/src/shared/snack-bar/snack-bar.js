import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { snackBarUpdated } from '../../services/app-service';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// { type: 'success', msg: 'Message here' }
// type: error
// type: warning
// type: info
// type: success
class SnackBars extends React.Component {
  state = {
    snackBarMsg: {},
  };

  componentDidMount() {
    this.subscription = snackBarUpdated((sbData) => {
      this.setState({ snackBarMsg: sbData });
      setTimeout(() => {
        this.handleClose();
      }, 6000);
    });
  }
  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackBarMsg: {} });
  };

  render() {
    const { snackBarMsg } = this.state;
    return (
      <Stack spacing={2} sx={{ width: '100%' }}>
        {
          snackBarMsg.type?.length > 0 &&
          <Snackbar
            open={snackBarMsg.type?.length > 0}
            autoHideDuration={6000}
            onClose={() => this.handleClose()}
            anchorOrigin={{ vertical: snackBarMsg.vert, horizontal: snackBarMsg.hor }}
            style={{
              zIndex: '1600'
            }}
          >
            <Alert
              onClose={() => this.handleClose()}
              severity={snackBarMsg.type}
              sx={{ width: '100%' }}
            >
              {snackBarMsg.msg}
            </Alert>
          </Snackbar>
        }
      </Stack>
    )
  }
}

export default SnackBars;