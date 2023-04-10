/**
 *
 * ESS-Test
 * Author: ESS-Test
 * Email: info@ESS-Test.com
 * Website: ESS-Test.com
 * Version: 1.0
 * Date: Wed Apr 22 2020
 * Category: Pages
 * Title: NotFound
 *
 */

import React from 'react';
import { Button } from "antd";
import { useNavigate } from 'react-router-dom';

// Icons
import NotFoundIcon from 'icons/NotFoundIcon';

const NotFound = () => {

  // Navigation
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <div className="text-center error-page pd-30">
        <h4 className="page-title"><strong>404</strong> Page Not Found</h4>
        <p>Oopps. The Page you were looking for doesn't exist</p>
        <NotFoundIcon className="icon" />
        <p>You may have mistyped the address or the page may have moved.</p>
        <Button type="primary" onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    </div>
  )
};

NotFound.propTypes = {};

export default NotFound;
