import { connect } from 'react-redux'
import Detail from '../components/Detail'
import { deleteLapse } from '../store/actions'

const mapStateToProps = (state, ownProps) => ({
    deleteLapsesStatus: state.deleteLapsesStatus,
    deleted : state.lapses.deleted
})

const mapDispatchToProps = {
    deleteLapse
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
