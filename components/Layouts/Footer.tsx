import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className="container footer_main">
      <ul className="ft_links">
        <li><Link href="#">Login</Link></li>
        <li><Link href="#">Signup</Link></li>
        <li><Link href="#">Help & Support</Link></li>
        <li><Link href="#">Terms of Service</Link></li>
        <li><Link href="#">U.S.C 2257</Link></li>
        <li><Link href="#">Privacy</Link></li>
        <li><Link href="#">DMCA</Link></li>
      </ul>
      <div className="ftright">
        <Link href="#" className="footer-logo"><Image src="/images/debit-cards-logo/dmca-logo.svg" alt="DMCA Logo" width={50} height={18}/></Link>
        <Link href="#" className="footer-logo"><Image src="/images/debit-cards-logo/master-card-logo.svg" alt="Master Logo" width={25} height={19}/></Link>
        <Link href="#" className="footer-logo"><Image src="/images/debit-cards-logo/visa-card-logo.svg" alt="Visa Logo" width={35} height={20}/></Link>
        <p>Copyright ©<Link href="#">Moneyboy.com.</Link> All rights reserved</p>
      </div>
    </div>
  )
}

export default Footer