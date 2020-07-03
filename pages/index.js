import Link from 'next/link'
import Axios from 'axios'
import { Button, Card } from 'semantic-ui-react'

const Index = ({ notes }) => {

  return (
    <div className="notes-container">
      <h1>Notes</h1>
      <div className="grid wrapper">
        {notes.map(note => (
          <div key={note._id}>
            <Card>
              <Card.Content>
                <Card.Header>
                  <Link href={`/${note._id}`}>
                    <a>{note.title}</a>
                  </Link>
                </Card.Header>
              </Card.Content>
              <Card.Content extra>
                <Link href={`/${note._id}`}>
                  <Button primary>View</Button>
                </Link>
                <Link href={`/${note._id}/edit`}>
                  <Button primary>Edit</Button>
                </Link>
              </Card.Content>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

Index.getInitialProps = async () => {
  const res = await Axios.get('/api/notes')

  return {
    notes: res.data.data
  }
}

export default Index