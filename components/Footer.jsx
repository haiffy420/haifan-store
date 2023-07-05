import React from 'react';
import {AiFillInstagram, AiFillGithub} from 'react-icons/ai';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>2023 Haifan Shop. All Rights Reserved.</p>
      <p className='icons'>
        <Link href='https://www.instagram.com/haifan_420/'>
          <AiFillInstagram />
        </Link>
        <Link href='https://github.com/haiffy420'>
          <AiFillGithub />
        </Link>
      </p>
    </div>
  )
}

export default Footer