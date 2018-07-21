import { connect } from 'react-redux'
import Home from '../components/Home'
import { fetchLapse, clearLapse, clearError } from '../store/actions'

const mapStateToProps = (state, ownProps) => ({
    lapses : state.lapses.data,
    lapsesStatus: state.lapsesStatus,
    deleteLapsesStatus: state.deleteLapsesStatus,
    api : state.api
})

const mapDispatchToProps = {
    fetchLapse,
    clearLapse,
    clearError
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
