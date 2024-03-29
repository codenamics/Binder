using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTO;
using API.Entity;
using API.Helpers;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
       
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<AppUser> GetUserByIdAsync(int id);
        Task<AppUser> GetUserByUsernameAsync(string username);
        Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams);
        Task<MemberDto> GetMemberAsync(string username, bool isCurrentUser);
           Task<AppUser> GetUserByPhotoId(int photoId);
        Task<string> GetUserGender(string username);
    }
}