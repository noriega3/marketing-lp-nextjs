import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Layout from '../../../components/Layout'

const WizardPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/schedule/wizard/zip')
  }, [ router ])
  
  return (
    <Layout title="Company">
      <Link href="/schedule/wizard/zip">
        <a>Click here to be redirected to the schedule form.</a>
      </Link>
    </Layout>
  )
}

export default WizardPage
