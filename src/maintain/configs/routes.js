/**
 * Created by ypc on 2016/9/20.
 */
import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import NavContainer from '../containers/NavContainer';
import LoginPage from '../containers/LoginPage';
import IndexPage from '../containers/IndexPage';
import UserProfilePage from '../containers/UserProfilePage';
import RealNameApplyPage from '../containers/RealNameApplyPage';
import NotificationPage from '../containers/NotificationsPage';
import CompanyAppliesPage from '../containers/CompanyAppliesPage';
import CompaniesPage from '../containers/CompaniesPage';
import JobsPage from '../containers/JobsPage';
import OrdersPage from '../containers/OrdersPage';
import ExpectJobsPage from '../containers/ExpectJobsPage';
import BannersPage from '../containers/BannersPage';
import FeedbacksPage from '../containers/FeedbacksPage';
import ReportsPage from '../containers/ReportsPage';
import JobEvaluatesPage from '../containers/JobEvaluatesPage';

export const routes = (
  <Route
    path="/"
  >
    <IndexRedirect to="m"/>
    <Route
      path="login"
      component={LoginPage}
    />
    <Route
      path="m"
      component={NavContainer}
    >
      <IndexRedirect to="index"/>
      <Route
        path="index"
        component={IndexPage}
      />
      <Route
        path="um"
      >
        <Route
          path="user_profiles"
          component={UserProfilePage}
        />
        <Route
          path="companies"
          component={CompaniesPage}
        />
        <Route
          path="jobs"
          component={JobsPage}
        />
        <Route
          path="orders"
          component={OrdersPage}
        />
        <Route
          path="expect_jobs"
          component={ExpectJobsPage}
        />
        <Route
          path="job_evaluates"
          component={JobEvaluatesPage}
        />
        <IndexRedirect to="user_profiles"/>
      </Route>
      <Route
        path="am"
      >
        <Route
          path="real_name"
          component={RealNameApplyPage}
        />
        <Route
          path="company"
          component={CompanyAppliesPage}
        />
        <Route
          path="feedbacks"
          component={FeedbacksPage}
        />
        <Route
          path="reports"
          component={ReportsPage}
        />
        <IndexRedirect to="real_name"/>
      </Route>

      <Route
        path="ac"
      >
        <Route
          path="notifications"
          component={NotificationPage}
        />
        <Route
          path="banners"
          component={BannersPage}
        />
      </Route>

    </Route>
  </Route>
)