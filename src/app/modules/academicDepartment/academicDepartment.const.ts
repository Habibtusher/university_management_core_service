export const AcademicDepartmentSearchableFields = ['title'];
export const AcademicDepartmentFilterableFields = [
    'searchTerm',
    'id',
    'academicFacultyId'
];
export const academicDepartmentRelationalFieldsMapper: { [key: string]: string } = {
    academicFacultyId: 'academicFaculty'
};
export const academicDepartmentRelationalFields: string[] = ['academicFacultyId'];