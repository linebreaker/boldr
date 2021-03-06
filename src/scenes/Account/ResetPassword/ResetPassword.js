/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import FormCard from '../../../components/Form/FormCard';
import { resetPassword } from '../../../state/users/actions';
import ResetPasswordForm from './ResetPasswordForm';

export type Props = {
  dispatch: () => void,
  match: Object,
};

class ResetPassword extends Component {
  constructor(props: Props) {
    super(props);

    (this: any).handleReset = this.handleReset.bind(this);
  }
  props: Props;

  handleReset(values, props): void {
    this.props.dispatch(resetPassword(values.password, this.props.match.params.token));
  }

  render() {
    return (
      <div>
        <Helmet title="Reset Password" />
        <FormCard
          title="Reset Password"
          skinny
          lightText
          form={<ResetPasswordForm onSubmit={this.handleReset} />}
        />
      </div>
    );
  }
}

export default connect()(ResetPassword);
