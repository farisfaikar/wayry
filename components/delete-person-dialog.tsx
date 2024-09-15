import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface DeletePersonDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  personName: string
}

export default function DeletePersonDialog({ isOpen, onClose, onConfirm, personName }: DeletePersonDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete {personName}?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. I repeat this action cannot be undone. You will permanently remove
            this person from this world, including all of their other-worldly connections. The souls, those who
            are attached to this person will haunt you for the rest of your life. Are you sure?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Perchance not
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            They shall meet god
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}