import { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import { scheduleContext } from "../../../state/schedule.context"
import Layout from '../../../components/Layout'
import ArticleLayout from "../../../components/ArticleLayout"
import ScheduleLayout from "../../../components/ScheduleLayout"
import ZipCodeInput from "../../../components/ZipCodeInput"
import ProgressBar from "../../../components/ScheduleWizard/ProgressBar"
import styles from './zip.module.scss'

const newLocal = /^[0-9]{5}(?:-[0-9]{4})?$/
const ReGvalidZip = newLocal;

const getQueryValue = (data: string | string[]) => {
    if (Array.isArray(data)) {
        return data.slice(-1).pop()
    }
    else if (typeof data === 'string') {
        return data
    }
    else {
        return undefined
    }
}
const ZipPage = () => {
    const router = useRouter();
    const { query } = router;
    const { step, zip, fips, apiStatus, getZipEligibility, setAPIStatus } = useContext(scheduleContext);

    useEffect(() => {
        const qZip = getQueryValue(query.z);
        const qFips = getQueryValue(query.f);
        const isValidZip = qZip && (qZip !== zip) && (qFips !== fips) && qZip.match(ReGvalidZip);
        if (isValidZip && apiStatus !== 'pending') {
            getZipEligibility({ zip: qZip, fips: qFips })
        }
    }, [router.query.z, apiStatus, fips, getZipEligibility, query.f, query.z, zip])

    useEffect(() => {
        if (apiStatus === 'pending' && step === 'zip') {
            setAPIStatus('idle')
        }
    }, [apiStatus, setAPIStatus, step])

    return (
        <>
            <h2>Find Medical plans near you</h2>
            <ZipCodeInput uid="0" className={`${styles.step_1_container}`} submitText="Next" autoFocus={true}>
                <ProgressBar value={50} />
            </ZipCodeInput>
        </>)
}
ZipPage.getLayout = function getLayout(page) {
    return (
        <Layout title="Company">
            <ArticleLayout>
                <ScheduleLayout>{page}</ScheduleLayout>
            </ArticleLayout>
        </Layout>
    )
}
export default ZipPage
