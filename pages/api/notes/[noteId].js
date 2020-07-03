import dbConnect from '@utils/dbConnect'
import Note from '@model/Note'

export default async (req, res) => {
    const {
        query: { noteId },
        method
    } = req

    await dbConnect()

    switch(method) {

        case 'GET':
            try {
                const note = await Note.findById(noteId)

                if (!note) {
                    res.status(400).json({ success: false })
                }

                res.status(200).json({ success: true, data: note })

            } catch (error) {
                res.status(400).json({ success: false })
            }

            break

        case 'PUT':
            try {

                const note = await Note.findByIdAndUpdate(noteId, req.body, {
                    new: true,
                    runValidators: true
                })

                if (!note) {
                    res.status(400).json({ success: false })
                }

                res.status(200).json({ success: true, data: note })

            } catch (error) {
                res.status(400).json({ success: false })
            }

            break

        case 'DELETE':
            try {

                const deleteNote = await Note.findByIdAndDelete(noteId)

                if (!deleteNote) {
                    return res.status(400).json({ success: false })
                }

                res.status(200).json({ success: true, data: {} })
                
            } catch (error) {
                res.status(400).json({ success: false })
            }

            break

        default:
            return res.status(400).json({ success: false })
            break
    }
}