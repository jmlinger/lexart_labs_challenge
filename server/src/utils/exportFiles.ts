import * as json2csv from 'json2csv'
import * as uuid from 'uuid'
import * as fs from 'fs'

const fields = ['id', 'userId', 'text', 'createdAt']
const opts = { fields }

class ExportFiles {
  tocsv = function (conversations: any) {
    try {
      console.log(conversations)

      const csv = json2csv.parse(conversations, opts)
      const fileName = uuid.v4() + '.csv'
      fs.writeFile('./exports/' + fileName, csv, function (err) {
        if (err) throw err
        console.log('Successfully saved file.')
      })
      return fileName
    } catch (error) {
      console.error(error)
    }
  }
}

export default new ExportFiles()
