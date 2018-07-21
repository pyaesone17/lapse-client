import { connect } from 'react-redux'
import ApiForm from '../components/ApiForm'
import { setApi, fetchLapse } from '../store/actions'

const mapStateToProps = (state, ownProps) => ({
    api: state.api,
    ...ownProps
})

const mapDispatchToProps = {
    setApi,
    fetchLapse
}

export default connect(mapStateToProps, mapDispatchToProps)(ApiForm)
