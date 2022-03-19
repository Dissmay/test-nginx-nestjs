import { StreamModel } from 'src/stream/stream.model';
import { StudentModel } from 'src/student/student.model';

export class MentorModel {
  name: string;
  surname: string;
  email: string;
  fullName: string;
  streams: StreamModel[];
  students: StudentModel[];
}
