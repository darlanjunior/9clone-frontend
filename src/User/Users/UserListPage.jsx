import { Header, Image, Table } from 'semantic-ui-react';
import React from 'react';

export default props => (
  <div>
    <h3>User list</h3>
    <Table basic='very' celled collapsing>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Employee</Table.HeaderCell>
          <Table.HeaderCell>Correct Guesses</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Header as='h4' image>
              <Image src='/assets/images/avatar/small/lena.png' shape='rounded' size='mini' />
              <Header.Content>
                Lena
                <Header.Subheader>Human Resources</Header.Subheader>
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell>
            22
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </div>
)
